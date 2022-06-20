const TestCollege = artifacts.require("TestCollege");

module.exports = function (deployer) {
    deployer.deploy(TestCollege);
};
