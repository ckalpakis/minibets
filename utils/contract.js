import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x70797B9D30B4A4528Aa1611d2c48525F28aa3C83";

const CONTRACT_ABI = [
  "function createBet(string description) payable",
  "function joinBet(uint256 betId) payable",
  "function resolveBet(uint256 betId, address winner)",
  "function getBetsCount() view returns (uint256)",
  "function bets(uint256) view returns (address creator, address opponent, uint256 amount, bool isOpen, bool isResolved, address winner, string description)",
];

export function getProvider() {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
}

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}
