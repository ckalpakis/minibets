import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProvider, getReadProvider, getContract } from "../utils/contract";
import BetCard from "../components/BetCard";

const btnStyle = {
  padding: "8px 16px",
  marginRight: "8px",
  cursor: "pointer",
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #555",
  borderRadius: "4px",
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

  if (!account) return <p>Please connect your wallet to view your bets.</p>;
  if (loading) return <p>Loading your bets...</p>;

  return (
    <div>
      <h1>My Bets</h1>
      {myBets.length === 0 && <p>You haven't created any bets.</p>}
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
