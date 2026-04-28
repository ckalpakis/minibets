import { useState } from "react";
import { ethers } from "ethers";
import { getProvider, getContract } from "../utils/contract";

const inputStyle = {
  padding: "10px",
  width: "100%",
  marginBottom: "12px",
  backgroundColor: "#1a1a1a",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "4px",
  fontSize: "16px",
  boxSizing: "border-box",
};

const btnStyle = {
  padding: "10px 24px",
  cursor: "pointer",
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #555",
  borderRadius: "4px",
  fontSize: "16px",
};

export default function Create({ account }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  async function handleCreate() {
    if (!description || !amount) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const provider = getProvider();
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.createBet(description, {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      alert("Bet created!");
      setDescription("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Error creating bet");
    }
  }

  if (!account) return <p>Please connect your wallet to create a bet.</p>;

  return (
    <div>
      <h1>Create a Bet</h1>
      <input
        style={inputStyle}
        placeholder="Bet description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        style={inputStyle}
        placeholder="Amount (tBNB)"
        type="number"
        step="0.001"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button style={btnStyle} onClick={handleCreate}>
        Create Bet
      </button>
    </div>
  );
}
