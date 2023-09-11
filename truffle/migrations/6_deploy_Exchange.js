const Exchange = artifacts.require("Exchange");

module.exports = function (deployer) {
  // fd1c5d9a06b2ffb655216aaa3fc1e820cc6f2599480ccc0979e1b561f6b8bb8e
  deployer.deploy(Exchange, `0xde1A85db11327f4F9A4Fcc98096c4e27632Ba6Aa`, 10);
};
