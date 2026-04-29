// index.js — Home page that displays all bets from the smart contract and allows users to join open bets

import { useCallback } from "react";
import { ethers } from "ethers";
import { getProvider, getContract } from "../utils/contract";
import useBets from "../hooks/useBets";
import BetCard from "../components/BetCard";
import PageHeading from "../components/PageHeading";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const btnStyle = {
  padding: "8px 20px",
  cursor: "pointer",
  background: "linear-gradient(135deg, #e2b714, #f0c836)",
  color: "#1a1a2e",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "14px",
};

export default function Home({ account }) {
  const { bets, loading, reload } = useBets();

  const handleJoin = useCallback(async (betId, amount) => {
    try {
      const provider = getProvider();
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.joinBet(betId, { value: amount });
      await tx.wait();
      alert("Joined bet!");
      reload();
    } catch (err) {
      console.error(err);
      alert("Error joining bet");
    }
  }, [reload]);

  if (loading) return <LoadingSpinner message="Loading bets..." />;

  return (
    <div>
      <PageHeading title="All Bets" subtitle="Browse open bets and join one to compete" />
      {bets.length === 0 && <EmptyState message="No bets yet. Be the first to create one!" />}
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
