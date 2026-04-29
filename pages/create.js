// create.js — Page for creating a new bet by entering a description and wager amount in tBNB

import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { getProvider, getContract } from "../utils/contract";
import PageHeading from "../components/PageHeading";

const inputStyle = {
  padding: "12px 14px",
  width: "100%",
  marginBottom: "14px",
  background: "rgba(255, 255, 255, 0.05)",
  color: "#fff",
  border: "1px solid rgba(226, 183, 20, 0.2)",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
};

const btnStyle = {
  padding: "12px 32px",
  cursor: "pointer",
  background: "linear-gradient(135deg, #e2b714, #f0c836)",
  color: "#1a1a2e",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
};

const formCard = {
  background: "linear-gradient(145deg, #1a1a2e, #16213e)",
  border: "1px solid rgba(226, 183, 20, 0.15)",
  borderRadius: "12px",
  padding: "24px",
};

const labelStyle = {
  color: "#888",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "6px",
  display: "block",
};

export default function Create({ account }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleCreate = useCallback(async () => {
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
  }, [description, amount]);

  if (!account) {
    return (
      <div>
        <PageHeading title="Create a Bet" />
        <p style={{ color: "#888" }}>Please connect your wallet to create a bet.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeading title="Create a Bet" subtitle="Set a wager and wait for someone to accept" />
      <div style={formCard}>
        <label style={labelStyle}>Description</label>
        <input
          style={inputStyle}
          placeholder="What's the bet?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label style={labelStyle}>Wager Amount</label>
        <input
          style={inputStyle}
          placeholder="0.001"
          type="number"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button style={btnStyle} onClick={handleCreate}>
          Create Bet
        </button>
      </div>
    </div>
  );
}
