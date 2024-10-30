const donationAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address
const donationABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getDonations",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "donor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Donation.DonationRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalDonations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDonations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider;
  } else {
    console.log("Please install MetaMask!");
  }
}

async function getDonationContract() {
  const provider = await connectWallet();
  const signer = provider.getSigner();
  return new ethers.Contract(donationAddress, donationABI, signer);
}

async function donate(amount) {
  const contract = await getDonationContract();
  const tx = await contract.receive({ value: ethers.utils.parseEther(amount) });
  await tx.wait();
  console.log("Donation successful:", tx);
}

// Example usage
document.getElementById("donateButton").addEventListener("click", async () => {
  const amount = document.getElementById("donationAmount").value;
  await donate(amount);
});
