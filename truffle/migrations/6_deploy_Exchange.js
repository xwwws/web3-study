const Exchange = artifacts.require("Exchange");

module.exports = function (deployer) {
  // d80914860a321b81a466bdc30d83b9b690d6666d77b3ce7494cc9863a21c4775
  deployer.deploy(Exchange, `0xef292cee1fc47e2964be539060ad454d380e2a83`, 6);
};
