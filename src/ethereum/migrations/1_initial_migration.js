const Main = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Main);
};
