const summonerType = `
  type Summoner {
    id: Int!
    name: String!
    accountId: Int!
    profileIconId: Int!
    summonerLevel: Int!
    matches: [Match]
  }
`;

module.exports = summonerType;
