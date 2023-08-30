const PersonListStorage = artifacts.require("PersonListStorage");

module.exports = function (deployer) {
  deployer.deploy(PersonListStorage);
};
