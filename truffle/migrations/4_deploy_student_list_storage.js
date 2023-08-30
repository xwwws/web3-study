const StudentListStorage = artifacts.require("StudentListStorage");

module.exports = function (deployer) {
  deployer.deploy(StudentListStorage);
};
