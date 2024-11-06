import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DonationModule = buildModule("DonationModule", (m) => {
  // Define and deploy the Donation contract
  const donation = m.contract("Donation");

  return { donation };
});

export default DonationModule;
