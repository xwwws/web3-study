const BDTToken = artifacts.require("BDTToken");

module.exports = function (deployer) {
  deployer.deploy(BDTToken);
};
