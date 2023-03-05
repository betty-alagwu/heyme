import Knex, { Knex as KnexConnection } from "knex"

export function insertVideo(connection: KnexConnection, data) {
  return connection("Videos").insert(data)
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
export async function fetchVideoById(connection: KnexConnection, id) {
  const results = await connection("Videos").select("*").where({ id })

  return results[0]
}

/**
 * Create a mysql connection to the database using mysql environment variables.
 *
 * @returns Mysql connection instance.
 */
export function createMysqlConnection() {
  return Knex({
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      port: (process.env.MYSQL_PORT as unknown as number) || 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  })
}
