// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // Deploy StudyCafeStorage
  const _StudyCafeStorage = await ethers.getContractFactory("StudyCafeStorage");
  StudyCafeStorage = await _StudyCafeStorage.deploy();
  await StudyCafeStorage.deployed();

  // Deploy StudyCafeLogic
  const _StudyCafeLogic = await ethers.getContractFactory("StudyCafeLogic");
  StudyCafeLogic = await _StudyCafeLogic.deploy(
    ethers.utils.parseEther("1"),
    ethers.utils.parseEther("0.05"),
    10
  );
  await StudyCafeLogic.deployed();

  // Deploy StudyCafeProxy
  const _StudyCafeProxy = await ethers.getContractFactory("StudyCafeProxy");
  StudyCafeProxy = await _StudyCafeProxy.deploy(
    StudyCafeLogic.address,
    StudyCafeStorage.address
  );
  await StudyCafeProxy.deployed();

  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");
  const LogicArtifact = artifacts.readArtifactSync("StudyCafeLogic");
  const StorageArtifact = artifacts.readArtifactSync("StudyCafeStorage");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(LogicArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(StorageArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
