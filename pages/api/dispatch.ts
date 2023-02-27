import { NextApiRequest, NextApiResponse } from "next"
import { createMysqlConnection } from "@/utils/server"
import { SendMailClient } from "zeptomail"

function getTomorrowAndYesterdayDates() {
  let now = new Date()
  let tomorrow = new Date(now)

  let yesterday = new Date(now)

  yesterday.setDate(yesterday.getDate() - 1)

  tomorrow.setDate(tomorrow.getDate() + 1)

  return [
    yesterday.toLocaleDateString().split("/").reverse().join("-"),
    tomorrow.toLocaleDateString().split("/").reverse().join("-"),
  ]
}

export async function fetchAllVideosForToday(connection): Promise<any[]> {
  return new Promise(function (resolve, reject) {
    connection.query(
      "SELECT * FROM `Videos` WHERE `send_at` BETWEEN ? AND ?",
      getTomorrowAndYesterdayDates(),
      function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

export async function updateVideoToSent(connection, id) {
  return new Promise(function (resolve, reject) {
    connection.query(
      `UPDATE Videos SET sent = ? WHERE id = ?`,
      [1, id],
      function (error, result) {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

export default async function handleDispatchEmails(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // connect to database
  const connection = createMysqlConnection()

  connection.connect()

  // fetch all videos from database where date is today.
  const videos = await fetchAllVideosForToday(connection)

  if (videos.length === 0) {
    console.log("No videos to send out.")
    return response.json([])
  }

  const url = "api.zeptomail.com/"
  const token = process.env.ZEPTOMAIL_TOKEN
  const client = new SendMailClient({ url, token })

  for (let index = 0; index < videos.length; index++) {
    const video = videos[index]

    if (video.sent === 1) {
      continue
    }

    await client.sendMail({
      bounce_address: "bounce@mails.heyme.io",
      from: {
        address: "betty@heyme.io",
        name: "Betty from Heyme",
      },
      to: [
        {
          email_address: {
            address: video.email,
          },
        },
      ],
      subject: `You've got a message from ${
        video.send_to === "yourself" ? "yourself" : "someone"
      }.`,
      htmlbody: `
      <div> <p> Hello. Thanks for this. Here's your message from the past. <a href="${process.env.SITE_URL}/watch/${video.id}">Watch your message now</a> </p> </div>
      `,
    })

    await updateVideoToSent(connection, video.id)
  }

  connection.end()
  return response.json([])
}