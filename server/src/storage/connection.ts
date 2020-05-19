import { createConnection, ConnectionOptions, Connection } from 'typeorm'
import * as entities from '../entities'

/** SQLite Configuration */
const config: ConnectionOptions = {
  type: 'sqlite',
  database: require('path').join(process.cwd(), 'data/database.sqlite'),
  entities: Object.values(entities),
  synchronize: true,
}

/** MSSQL Configuration */
// const config: ConnectionOptions = {
//   name: 'default',
//   type: 'mssql',
//   host: 'localhost',
//   username: 'scratch',
//   password: 'scratch',
//   database: 'scratch',
//   entities: Object.values(entities),
//   synchronize: true,
// }

let connection: Promise<Connection>

export async function getConnection() {
  if (!connection) {
    connection = createConnection(config)
  }

  return await connection
}
