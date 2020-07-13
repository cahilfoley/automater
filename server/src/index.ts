import { createServer } from 'http'
import path from 'path'
import express from 'express'
import { attachSubscriptionServer, attachGraphQLRoutes } from './graphql'
// import { getConnection } from './storage/connection'

const PORT = process.env.PORT || 8080

const userAgentsToMatch = /msie|trident/i

async function start() {
  // Start database connection
  // await getConnection()

  const app = express()

  await attachGraphQLRoutes(app)
  app.use('/static', express.static('./public/static', { maxAge: 31536000 }))
  app.use('/', express.static('./public', { maxAge: 0 }))

  app.get('*', (req, res, next) => {
    if (
      req.headers.accept?.toLowerCase().includes('text/html') ||
      userAgentsToMatch.test(req.headers['user-agent'] || '')
    ) {
      const indexPath = path.join(process.cwd(), 'public/index.html')
      return res.sendFile(indexPath)
    } else {
      next()
    }
  })

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
