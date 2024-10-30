import { ethers } from "hardhat";
import "@typechain/hardhat";
import { expect } from "chai";
import { Donation } from "../typechain-types";

describe("Donation Contract", function () {
  let donationContract: Donation;
  let owner: any;
  let donor1: any;
  let donor2: any;

  beforeEach(async function () {
    [owner, donor1, donor2] = await ethers.getSigners();
    const Donation = await ethers.getContractFactory("Donation");
    donationContract = await Donation.deploy();
  });

  it("should set the deployer as the owner", async function () {
    expect(await donationContract.owner()).to.equal(owner.address);
  });

  it("should accept donations and record them correctly", async function () {
    const donationAmount = ethers.parseEther("1");

    await donor1.sendTransaction({ value: donationAmount });
    const totalDonations = await donationContract.totalDonations();
    expect(totalDonations).to.equal(donationAmount);

    const donations = await donationContract.getDonations();
    expect(donations.length).to.equal(1);
    expect(donations[0].donor).to.equal(donor1.address);
    expect(donations[0].amount).to.equal(donationAmount);
  });
  //
  // it("should update totalDonations after multiple donations", async function() {
  //   const donation1 = ethers.parseEther("1");
  //   const donation2 = ethers.parseEther("2");
  //
  //   await donor1.sendTransaction({ value: donation1 });
  //   await donor2.sendTransaction({ value: donation2 });
  //
  //   const totalDonations = await donationContract.totalDonations();
  //   expect(totalDonations).to.equal(donation1 + donation2);
  // });
});
