import { split, HttpLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ credentials: 'include', uri: '/api/graphql' })

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/api/subscriptions`,
  options: { reconnect: true },
})

/**
 * A link that will send subscriptions over web sockets and queries/mutations over http/s
 *
 * Modification from the example in the apollo documentation
 * @see https://www.apollographql.com/docs/react/data/subscriptions/#client-setup
 */
export const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)
