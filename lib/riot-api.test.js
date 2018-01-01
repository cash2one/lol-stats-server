require("dotenv").config();

const axios = require("axios");
const RiotApi = require("./riot-api");

describe("getSummonerByName", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("calls Riot endpoint with summoner name", async () => {
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
      data: "Foo"
    };

    axios.get.mockReturnValueOnce(Promise.resolve(expectedResponse));

    const response = await RiotApi.getSummonerByName("Summoner123");
    expect(response).toEqual(expectedResponse.data);
  });

  it("preserves Riot API errors", async () => {
    // TODO - resolve a promise instead and verify requests with non-200 statuses
    // are rejected and passed along as errors (for all "preserves Riot API" tests)
    axios.get.mockReturnValue(Promise.reject("Boo!"));

    try {
      await RiotApi.getSummonerByName("test");
    } catch (error) {
      expect(error).toBe("Boo!");
    }
  });
});

describe("getSummonerById", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("calls Riot endpoint with summoner name", async () => {
    axios.get.mockReturnValueOnce({ data: {} });
    const response = await RiotApi.getSummonerById(123);

    const expectedEndpoint = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/123?api_key=${
      process.env.RIOT_API_KEY
    }`;

    expect(axios.get.mock.calls.length).toBe(1);

    const [endpoint] = axios.get.mock.calls[0];
    expect(endpoint).toBe(expectedEndpoint);
  });

  it("responds with summoner JSON on successful request", async () => {
    const expectedResponse = {
      data: "Foo"
    };

    axios.get.mockReturnValueOnce(Promise.resolve(expectedResponse));

    const response = await RiotApi.getSummonerById(123);
    expect(response).toEqual(expectedResponse.data);
  });

  it("preserves Riot API errors", async () => {
    axios.get.mockReturnValue(Promise.reject("Boo!"));

    try {
      await RiotApi.getSummonerById(123);
    } catch (error) {
      expect(error).toBe("Boo!");
    }
  });
});

describe("getMatchListByAccountId", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("calls Riot endpoint with account id", async () => {
    axios.get.mockReturnValueOnce({ data: {} });
    const response = await RiotApi.getMatchListByAccountId(123);

    const expectedEndpoint = `https://na1.api.riotgames.com/lol/matchlists/v3/by-account/123?api_key=${
      process.env.RIOT_API_KEY
    }`;

    expect(axios.get.mock.calls.length).toBe(1);

    const [endpoint] = axios.get.mock.calls[0];
    expect(endpoint).toBe(expectedEndpoint);
  });

  it("responds with matchlist JSON on successful request", async () => {
    const expectedResponse = {
      data: "Foo"
    };

    axios.get.mockReturnValueOnce(Promise.resolve(expectedResponse));

    const response = await RiotApi.getMatchListByAccountId(123);
    expect(response).toEqual(expectedResponse.data);
  });

  it("preserves Riot API errors", async () => {
    axios.get.mockReturnValue(Promise.reject("Boo!"));

    try {
      await RiotApi.getMatchListByAccountId(123);
    } catch (error) {
      expect(error).toBe("Boo!");
    }
  });
});
