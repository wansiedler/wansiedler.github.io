import { ignition, run } from "hardhat";
import DonationModule from "../ignition/modules/Donation";
import "@nomicfoundation/hardhat-ignition";

async function main() {
  // const { donation } = await run("ignition:deploy", { module: DonationModule });
  const { donation } = await ignition.deploy(DonationModule);
  console.log("Donation contract deployed at:", donation.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
