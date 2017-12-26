const axios = require("axios");
const httpAdapter = require("axios/lib/adapters/http");

// Prevents Axios from attempting to use the XHR API in non-node
// environments like Jest
axios.defaults.adapter = httpAdapter;

// TODO: Region-based endpoints
const BASE_URL = "https://na1.api.riotgames.com";
const API_KEY = process.env.RIOT_API_KEY;

class RiotApi {
  static async getSummonerByName(name) {
    const endpoint = `/lol/summoner/v3/summoners/by-name/${name}?api_key=${API_KEY}`;

    const response = await axios.get(BASE_URL + endpoint);

    // TODO - format response
    return response.data;
  }
}

module.exports = RiotApi;
