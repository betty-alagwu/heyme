import Fs from "fs"
import Path from "path"
import { NextApiRequest, NextApiResponse } from "next"
import { createMysqlConnection } from "@/utils/server"
import dayjs from "dayjs"
import type { Knex } from "knex"
import { SendMailClient } from "zeptomail"

function getEmailContent({ watchLink, greeting, body, outro }) {
  let emailContent = Fs.readFileSync(
    Path.resolve("public", "mails", "email.html")
  ).toString()

  emailContent = emailContent.replace("{{REPLACE_WATCH_LINK_HERE}}", watchLink)
  emailContent = emailContent.replace("{{REPLACE_GREETING_HERE}}", greeting)
  emailContent = emailContent.replace("{{REPLACE_BODY_HERE}}", body)
  emailContent = emailContent.replace("{{REPLACE_OUTRO_HERE}}", outro)

  return emailContent
}

function getFormattedDateToday() {
  let now = new Date()

  return now.toLocaleDateString().split("/").reverse().join("-")
}

export async function fetchAllVideosForToday(connection: Knex): Promise<any[]> {
  return connection("Videos")
    .select("*")
    .where({ send_at: getFormattedDateToday() })
}

export async function updateVideoToSent(connection: Knex, id: number) {
  await connection("Videos").where({ id }).update({
    sent: 1,
  })
}

export default async function handleDispatchEmails(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // connect to database
  const knex = createMysqlConnection()

  // fetch all videos from database where date is today.
  const videos = await fetchAllVideosForToday(knex)

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

    const isYourself = video.send_to === "yourself"

    video.created_at = dayjs(video.created_at).format("MMM D, YYYY")

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
      subject: isYourself
        ? `You sent yourself a message from the past. Check it out.`
        : `Someone sent you a message from the past. Check it out.`,
      htmlbody: getEmailContent({
        watchLink: `${process.env.SITE_URL}/watch/${video.id}`,
        greeting: isYourself
          ? `Do you still remember sending yourself a message on ${video.created_at}?`
          : `Someone sent you a message on ${video.created_at}`,
        body: `This message was sent using our future message service called <a href="https://heyme.io" target="_blank">heyme</a>.`,
        outro: "Thank you for using our service.",
      }),
    })

    await updateVideoToSent(knex, video.id)
  }

  await knex.destroy()
  return response.json([])
}
