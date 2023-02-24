import { NextApiRequest, NextApiResponse } from "next"
import Mysql from "mysql"

export default async function handleDispatchEmails(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // connect to database
  const connection = Mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: (process.env.MYSQL_PORT as unknown as number) || 3306,
  })

  connection.connect()

  // fetch all videos from database where date is today.
  // send emails to all fetched videos.

  connection.end()
  return response.json([])
}
