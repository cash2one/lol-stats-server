const RiotApi = require("../../../riot-api");

class SummonerResolver {
  static getByName(_, { name }) {
    return RiotApi.getSummonerByName(name);
  }

  static getById(_, { id }) {
    return RiotApi.getSummonerById(id);
  }
}

module.exports = SummonerResolver;
