import { Server } from 'http'
import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import { schema } from './schema'

export const APOLLO_SUBSCRIPTION_PATH = '/api/subscriptions'
export const APOLLO_GRAPHQL_PATH = '/api/graphql'

export async function attachSubscriptionServer(httpServer: Server) {
  const server = new SubscriptionServer(
    { execute, subscribe, schema },
    { server: httpServer, path: APOLLO_SUBSCRIPTION_PATH }
  )

  return server
}

export const apollo = new ApolloServer({
  schema,
  subscriptions: { path: APOLLO_SUBSCRIPTION_PATH },
})

export async function attachGraphQLRoutes(app: Express) {
  apollo.applyMiddleware({ app, path: APOLLO_GRAPHQL_PATH })
}
