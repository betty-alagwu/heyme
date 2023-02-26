import Mysql from "mysql"

export async function insertVideo(connection, data) {
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

/**
 * Fetch a row from Videos table where id matches @param id passed into this function
 *
 * Resolves with undefined if no video was found
 * Rejects with an error if anything goes wrong with the query
 *
 * @param connection Mysql database connection
 * @param id id of video we want to find. Usually coming from dynamic page route params
 * @returns Promise with video row or undefined.
 */
export function fetchVideoById(connection, id) {
  return new Promise(function (resolve, reject) {
    connection.query(
      `SELECT * FROM Videos WHERE id = ?`,
      id,
      function (error, results, fields) {
        if (error) {
          reject(error)
        } else {
          resolve(results[0])
        }
      }
    )
  })
}

/**
 * Create a mysql connection to the database using mysql environment variables.
 *
 * @returns Mysql connection instance.
 */
export function createMysqlConnection() {
  return Mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: (process.env.MYSQL_PORT as unknown as number) || 3306,
  })
}
