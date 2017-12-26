const bodyParser = require("body-parser");
const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

const schema = require("./graphql/schema");
const RiotApi = require("./riot-api");
const riotApiClient = new RiotApi(process.env.RIOT_API_KEY);

const app = express();

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

if (process.env.NODE_ENV !== "production") {
  app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
}

module.exports = app;
