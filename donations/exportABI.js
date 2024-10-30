// exportABI.js
const fs = require("fs");
const path = require("path");

async function main() {
  const contractName = "Donation"; // Replace with your contract name
  const artifactsPath = path.join(__dirname, "artifacts", "contracts", `${contractName}.sol`, `${contractName}.json`);
  const outputPath = path.join(__dirname, `${contractName}ABI.json`);

  const artifact = require(artifactsPath);
  const abi = artifact.abi;

  fs.writeFileSync(outputPath, JSON.stringify(abi, null, 2));
  console.log(`ABI exported to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
