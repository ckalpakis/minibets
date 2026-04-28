import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProvider, getContract } from "../utils/contract";
import BetCard from "../components/BetCard";

const btnStyle = {
  padding: "8px 16px",
  cursor: "pointer",
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #555",
  borderRadius: "4px",
};

export default function Home({ account }) {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBets();
  }, []);

  async function loadBets() {
    try {
      const provider = getProvider();
      if (!provider) return;
      const contract = getContract(provider);
      const count = await contract.getBetsCount();
      const loaded = [];
      for (let i = 0; i < Number(count); i++) {
        const b = await contract.bets(i);
        loaded.push({
          id: i,
          creator: b[0],
          opponent: b[1],
          amount: b[2],
          isOpen: b[3],
          isResolved: b[4],
          winner: b[5],
          description: b[6],
        });
      }
      setBets(loaded);
    } catch (err) {
      console.error("Error loading bets:", err);
    }
    setLoading(false);
  }

  async function handleJoin(betId, amount) {
    try {
      const provider = getProvider();
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.joinBet(betId, { value: amount });
      await tx.wait();
      alert("Joined bet!");
      loadBets();
    } catch (err) {
      console.error(err);
      alert("Error joining bet");
    }
  }

  if (loading) return <p>Loading bets...</p>;

  return (
    <div>
      <h1>All Bets</h1>
      {bets.length === 0 && <p>No bets yet.</p>}
      {bets.map((bet) => (
        <BetCard
          key={bet.id}
          bet={bet}
          actions={
            bet.isOpen &&
            bet.opponent === ethers.ZeroAddress &&
            account &&
            bet.creator.toLowerCase() !== account.toLowerCase() ? (
              <button style={btnStyle} onClick={() => handleJoin(bet.id, bet.amount)}>
                Join Bet
              </button>
            ) : null
          }
        />
      ))}
    </div>
  );
}
