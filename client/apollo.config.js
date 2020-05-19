// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path')
const url = 'http://localhost:8080/api/graphql'
const localSchemaFile = join(__dirname, 'schema.graphql')

module.exports = {
  client: {
    service: {
      name: 'passport-webcore',
      localSchemaFile,
      url,
    },
    includes: ['./src/**/*.graphql'],
  },
}
