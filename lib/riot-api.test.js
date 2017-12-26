require("dotenv").config();

const axios = require("axios");
const RiotApi = require("./riot-api");

describe("getSummonerByName", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("calls Riot endpoint with summoner name and expected headers", async () => {
    axios.get.mockReturnValueOnce({ data: {} });
    const response = await RiotApi.getSummonerByName("test");

    const expectedEndpoint = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/test?api_key=${
      process.env.RIOT_API_KEY
    }`;

    expect(axios.get.mock.calls.length).toBe(1);

    const [endpoint] = axios.get.mock.calls[0];
    expect(endpoint).toBe(expectedEndpoint);
  });

  it("responds with summoner JSON on successful request", async () => {
    const expectedResponse = {
      data: {
        id: 12345,
        accountId: 54321,
        name: "Summoner123",
        profileIconId: 789,
        summonerLevel: 45
      }
    };

    axios.get.mockReturnValueOnce(Promise.resolve(expectedResponse));

    const response = await RiotApi.getSummonerByName("Summoner123");
    expect(response).toEqual(expectedResponse.data);
  });

  it("preserves Riot API errors", async () => {
    axios.get.mockReturnValue(Promise.reject("Boo!"));

    try {
      await RiotApi.getSummonerByName("test");
    } catch (error) {
      expect(error).toBe("Boo!");
    }
  });
});
