import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x68dd09fD8825134A2A506D022Eff387C7311738E";

const CONTRACT_ABI = [
  "function createBet(string description) payable",
  "function joinBet(uint256 betId) payable",
  "function resolveBet(uint256 betId, address winner)",
  "function getBetsCount() view returns (uint256)",
  "function bets(uint256) view returns (address creator, address opponent, uint256 amount, bool isOpen, bool isResolved, address winner, string description)",
];

const BSC_TESTNET_RPC = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export function getProvider() {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
}

export function getReadProvider() {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return new ethers.JsonRpcProvider(BSC_TESTNET_RPC);
}

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}
