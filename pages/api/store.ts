import { NextApiRequest, NextApiResponse } from "next"
import Mysql from "mysql"

async function insertVideo(connection, data) {
  return new Promise(function (resolve, reject) {
    connection.query(
      `INSERT INTO Videos SET ?`,
      data,
      function (error, results, fields) {
        if (error) {
          reject(error)
        } else {
          resolve({ results, fields })
        }
      }
    )
  })
}

export default async function handleStoreVideo(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const data = request.body

  if (!data.video_url || !data.email || !data.send_at || !data.send_to) {
    return response.status(400).json({ message: "Invalid data provided." })
  }

  // connect to database
  const connection = Mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: (process.env.MYSQL_PORT as unknown as number) || 3306,
  })

  connection.connect()

  const result = await insertVideo(connection, data)

  connection.end()

  response.json(result)
}
