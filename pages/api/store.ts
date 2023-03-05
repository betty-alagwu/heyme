import { NextApiRequest, NextApiResponse } from "next"
import { createMysqlConnection, insertVideo } from "@/utils/server"

export default async function handleStoreVideo(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const data = request.body

  if (
    !data.video_url ||
    !data.email ||
    !data.send_at ||
    !data.send_to ||
    !data.created_at
  ) {
    return response.status(400).json({ message: "Invalid data provided." })
  }

  // connect to database
  const connection = createMysqlConnection()

  const result = await insertVideo(connection, data)

  await connection.destroy()

  response.json(result)
}
