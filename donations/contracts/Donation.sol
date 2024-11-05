pragma solidity ^0.8.0;

contract Donation {
    address public owner;
    uint256 public totalDonations;

    struct DonationRecord {
        address donor;
        uint256 amount;
    }

    DonationRecord[] private donations;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        donations.push(DonationRecord({
            donor: msg.sender,
            amount: msg.value
        }));
        totalDonations += msg.value;
    }

    function getDonations() external view returns (DonationRecord[] memory) {
        return donations;
    }

    function getTotalDonations() external view returns (uint256) {
        return totalDonations;
    }
}
