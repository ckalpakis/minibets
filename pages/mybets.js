// mybets.js — Page showing bets created by the connected wallet, with controls to resolve each bet

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
  marginRight: "8px",
  cursor: "pointer",
  background: "linear-gradient(135deg, #e2b714, #f0c836)",
  color: "#1a1a2e",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "14px",
};

export default function MyBets({ account }) {
  const { bets: myBets, loading, reload } = useBets(account);

  const handleResolve = useCallback(async (betId, winnerAddress) => {
    try {
      const provider = getProvider();
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.resolveBet(betId, winnerAddress);
      await tx.wait();
      alert("Bet resolved!");
      reload();
    } catch (err) {
      console.error(err);
      alert("Error resolving bet");
    }
  }, [reload]);

  if (!account) {
    return (
      <div>
        <PageHeading title="My Bets" />
        <p style={{ color: "#888" }}>Please connect your wallet to view your bets.</p>
      </div>
    );
  }

  if (loading) return <LoadingSpinner message="Loading your bets..." />;

  return (
    <div>
      <PageHeading title="My Bets" subtitle="Manage bets you've created" />
      {myBets.length === 0 && <EmptyState message="You haven't created any bets yet." />}
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
