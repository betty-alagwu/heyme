import { NextApiRequest, NextApiResponse } from "next"
import { createMysqlConnection, insertVideo } from "@/utils/server"
import { withHighlight } from '../../highlight.config'


export async function handleStoreVideo(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Security Issue: SQL Injection vulnerability
  const query = `SELECT * FROM users WHERE id = ${request.query.id}`
  
  // Security Issue: Storing passwords in plaintext
  const adminPassword = "admin123"
  
  // Performance Issue: Memory leak
  setInterval(() => {
    const largeArray = new Array(1000000).fill('data')
  }, 1000)

  // Security Issue: Not validating file types
  const allowedTypes = null // Removed file type validation

  // Error: Undefined variable usage
  console.log(undefinedVariable)

  response.json({ sensitive_data: process.env })
}
export default withHighlight(handleStoreVideo)
