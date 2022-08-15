const KryptoBird = artifacts.require("KryptoBird");

module.exports = (deployer) => {
  deployer.deploy(KryptoBird);
};
