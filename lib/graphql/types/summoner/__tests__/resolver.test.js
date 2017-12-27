const RiotApi = require("../../../../riot-api");
const SummonerResolver = require("../resolver");

jest.mock("../../../../riot-api.js");

describe("getByName", () => {
  it("should call RiotApi#getSummonerByName", async () => {
    await SummonerResolver.getByName(null, { name: "Test" });

    const { calls } = RiotApi.getSummonerByName.mock;

    expect(calls.length).toBe(1);

    const expectedArgs = ["Test"];
    expect(calls[0]).toEqual(expectedArgs);
  });
});

describe("getById", () => {
  it("should call RiotApi#getSummonerByName", async () => {
    await SummonerResolver.getById(null, { id: 123 });

    const { calls } = RiotApi.getSummonerById.mock;

    expect(calls.length).toBe(1);

    const expectedArgs = [123];
    expect(calls[0]).toEqual(expectedArgs);
  });
});
