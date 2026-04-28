import { ethers } from "ethers";

const cardStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "12px",
};

const btnStyle = {
  padding: "8px 16px",
  marginRight: "8px",
  marginTop: "8px",
  cursor: "pointer",
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #555",
  borderRadius: "4px",
};

export default function BetCard({ bet, actions }) {
  const status = bet.isResolved
    ? "Resolved"
    : bet.opponent !== ethers.ZeroAddress
      ? "Joined"
      : "Open";

  return (
    <div style={cardStyle}>
      <p><strong>Description:</strong> {bet.description}</p>
      <p><strong>Amount:</strong> {ethers.formatEther(bet.amount)} tBNB</p>
      <p><strong>Creator:</strong> {bet.creator}</p>
      <p><strong>Status:</strong> {status}</p>
      {bet.opponent !== ethers.ZeroAddress && (
        <p><strong>Opponent:</strong> {bet.opponent}</p>
      )}
      {bet.isResolved && (
        <p><strong>Winner:</strong> {bet.winner}</p>
      )}
      {actions && <div>{actions}</div>}
    </div>
  );
}
