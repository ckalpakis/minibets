import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProvider, getReadProvider, getContract } from "../utils/contract";
import BetCard from "../components/BetCard";

const btnStyle = {
  padding: "8px 20px",
  marginRight: "8px",
  cursor: "pointer",
  background: "linear-gradient(135deg, #e2b714, #f0c836)",
  color: "#1a1a2e",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "14px",
};

const headingStyle = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "24px",
  color: "#fff",
};

const emptyStyle = {
  color: "#666",
  textAlign: "center",
  padding: "40px 0",
  fontSize: "16px",
};

export default function MyBets({ account }) {
  const [myBets, setMyBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) loadMyBets();
    else setLoading(false);
  }, [account]);

  async function loadMyBets() {
    try {
      const provider = getReadProvider();
      const contract = getContract(provider);
      const count = await contract.getBetsCount();
      const loaded = [];
      for (let i = 0; i < Number(count); i++) {
        const b = await contract.bets(i);
        if (b[0].toLowerCase() === account.toLowerCase()) {
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
      }
      setMyBets(loaded);
    } catch (err) {
      console.error("Error loading bets:", err);
    }
    setLoading(false);
  }

  async function handleResolve(betId, winnerAddress) {
    try {
      const provider = getProvider();
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.resolveBet(betId, winnerAddress);
      await tx.wait();
      alert("Bet resolved!");
      loadMyBets();
    } catch (err) {
      console.error(err);
      alert("Error resolving bet");
    }
  }

  if (!account) return <p style={{ color: "#888" }}>Please connect your wallet to view your bets.</p>;
  if (loading) return <p style={{ color: "#888" }}>Loading your bets...</p>;

  return (
    <div>
      <h1 style={headingStyle}>My Bets</h1>
      {myBets.length === 0 && <p style={emptyStyle}>You haven't created any bets.</p>}
      {myBets.map((bet) => (
        <BetCard
          key={bet.id}
          bet={bet}
          actions={
            bet.opponent !== ethers.ZeroAddress && !bet.isResolved ? (
              <>
                <button style={btnStyle} onClick={() => handleResolve(bet.id, bet.creator)}>
                  Creator Wins
                </button>
                <button style={btnStyle} onClick={() => handleResolve(bet.id, bet.opponent)}>
                  Opponent Wins
                </button>
              </>
            ) : null
          }
        />
      ))}
    </div>
  );
}
