const express = require("express");
const morgan = require("morgan");

const RiotApi = require("./riot-api");
const riotApiClient = new RiotApi(process.env.RIOT_API_KEY);

const app = express();

// Set up request logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("common"));
} else if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/", (request, response) => {
  response.send("Hello world");
});

app.get("/summoners/:name/", async (request, response) => {
  try {
    const summoner = await riotApiClient.getSummonerByName(request.params.name);
    response.json(summoner);
  } catch (error) {
    console.error(error);
    response.json({ error: { message: error.message } });
  }
});

module.exports = app;
