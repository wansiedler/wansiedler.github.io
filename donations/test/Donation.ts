import { expect } from "chai";
import { ethers } from "hardhat";

describe("Donation", function() {
  let signer1: any, signer2: any, signer3: any;
  let Donation: any, donation: any;

  beforeEach(async function() {
    [signer1, signer2, signer3] = await ethers.getSigners();

    Donation = await ethers.getContractFactory("Donation", signer1);
    donation = await Donation.deploy();
    await donation.deployed(); // Wait for the contract to be deployed
  });

  describe("donateEther", function() {
    it("transfers ether to the contract", async function() {
      await signer2.sendTransaction({
        to: donation.address,
        value: ethers.parseEther("0.1"), // Using utils to convert Ether
      });

      expect(
        await ethers.provider.getBalance(donation.address),
      ).to.equal(ethers.parseEther("0.1"));
    });
  });

  describe("getTotalDonations", function() {
    it("returns the sum of donations transferred to the contract", async function() {
      await signer1.sendTransaction({
        to: donation.address,
        value: ethers.parseEther("1"),
      });
      await signer2.sendTransaction({
        to: donation.address,
        value: ethers.parseEther("5"),
      });
      await signer3.sendTransaction({
        to: donation.address,
        value: ethers.parseEther("50"),
      });

      expect(
        await donation.getTotalDonations(),
      ).to.equal(ethers.parseEther("56")); // Compare using parseEther
    });
  });

  describe("getDonations", function() {
    it("returns an array of donations transferred to the contract", async function() {
      await signer1.sendTransaction({
        to: donation.address,
        value: ethers.parseEther("10"),
      });
      await signer2.sendTransaction({
        to: donation.address,
        value: ethers.parseEther("20"),
      });

      const donations = await donation.getDonations();

      expect(donations[0].donor).to.equal(signer1.address);
      expect(donations[0].amount).to.equal(ethers.parseEther("10"));
      expect(donations[1].donor).to.equal(signer2.address);
      expect(donations[1].amount).to.equal(ethers.parseEther("20"));
    });
  });
});
