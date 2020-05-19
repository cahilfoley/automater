import { createServer } from 'http'
import express from 'express'
import { attachSubscriptionServer, attachGraphQLRoutes } from './graphql'
// import { getConnection } from './storage/connection'

const PORT = process.env.PORT || 8080

async function start() {
  // Start database connection
  // await getConnection()

  const app = express()

  await attachGraphQLRoutes(app)
  app.get('/', (req, res) => res.send('Hello World'))

  const server = createServer(app)

  server.listen(PORT, async () => {
    console.log(`HTTP Server listening: http://localhost:${PORT}/`)
    console.log(`GraphQL playground: http://localhost:${PORT}/api/graphql`)
    await attachSubscriptionServer(server)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
