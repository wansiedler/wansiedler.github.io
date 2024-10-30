// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    address public owner;
    uint256 public totalDonations;

    struct DonationRecord {
        address donor;
        uint256 amount;
    }

    DonationRecord[] private donations;

    event DonationReceived(address indexed donor, uint256 amount);
    event Withdrawal(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        donations.push(DonationRecord({
            donor: msg.sender,
            amount: msg.value
        }));
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getDonations() external view returns (DonationRecord[] memory) {
        return donations;
    }

    function getTotalDonations() external view returns (uint256) {
        return totalDonations;
    }

    function withdraw() external {
        require(msg.sender == owner, "Only the owner can withdraw");
        uint256 amount = address(this).balance;
        (bool success,) = owner.call{value: amount}("");
        require(success, "Withdrawal failed");
        emit Withdrawal(owner, amount);
        totalDonations -= amount;
    }
}
