const RiotApi = require("../../../riot-api");

class SummonerResolver {
  static getByName(_, { name }) {
    return RiotApi.getSummonerByName(name);
  }
}

module.exports = SummonerResolver;
