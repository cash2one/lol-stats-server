const { makeExecutableSchema } = require("graphql-tools");
const SummonerResolver = require("./types/summoner/resolver");
const types = require("./utils/types");

const rootQuery = `
  type Query {
    # Fetch a summoner by name
    summonerByName(name: String!): Summoner

    # Fetch a summoner by ID
    summonerById(id: Int!): Summoner
  }
`;

const typeDefs = [...types, rootQuery];

const resolvers = {
  Query: {
    summonerByName: SummonerResolver.getByName,
    summonerById: SummonerResolver.getById
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
