const axios = require("axios");
const httpAdapter = require("axios/lib/adapters/http");

// Prevents Axios from attempting to use the XHR API in non-node
// environments like Jest
axios.defaults.adapter = httpAdapter;

// TODO: Region-based endpoints
const BASE_URL = "https://na1.api.riotgames.com";

class RiotApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getSummonerByName(name) {
    const endpoint = `/lol/summoner/v3/summoners/by-name/${name}?api_key=${
      this.apiKey
    }`;

    const response = await axios.get(BASE_URL + endpoint);

    // TODO - format response
    return {
      summoner: response.data
    };
  }
}

module.exports = RiotApi;
