const StudentStorage = artifacts.require("StudentStorage");

module.exports = function (deployer) {
  deployer.deploy(StudentStorage);
};
