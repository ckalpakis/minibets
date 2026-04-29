import { ethers } from "ethers";

const cardStyle = {
  background: "linear-gradient(145deg, #1a1a2e, #16213e)",
  border: "1px solid rgba(226, 183, 20, 0.15)",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "16px",
};

const labelStyle = {
  color: "#888",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "2px",
};

const valueStyle = {
  color: "#eee",
  fontSize: "15px",
  marginBottom: "12px",
};

const descriptionStyle = {
  color: "#fff",
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "16px",
  lineHeight: "1.4",
};

const amountStyle = {
  color: "#e2b714",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const addressStyle = {
  color: "#aaa",
  fontSize: "13px",
  fontFamily: "monospace",
};

const statusColors = {
  Open: { bg: "rgba(46, 204, 113, 0.15)", color: "#2ecc71", border: "rgba(46, 204, 113, 0.3)" },
  Joined: { bg: "rgba(52, 152, 219, 0.15)", color: "#3498db", border: "rgba(52, 152, 219, 0.3)" },
  Resolved: { bg: "rgba(155, 89, 182, 0.15)", color: "#9b59b6", border: "rgba(155, 89, 182, 0.3)" },
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
};

export default function BetCard({ bet, actions }) {
  const status = bet.isResolved
    ? "Resolved"
    : bet.opponent !== ethers.ZeroAddress
      ? "Joined"
      : "Open";

  const sc = statusColors[status];
  const badgeStyle = {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    background: sc.bg,
    color: sc.color,
    border: `1px solid ${sc.border}`,
  };

  return (
    <div style={cardStyle}>
      <div style={rowStyle}>
        <div style={descriptionStyle}>{bet.description}</div>
        <span style={badgeStyle}>{status}</span>
      </div>
      <div style={amountStyle}>{ethers.formatEther(bet.amount)} tBNB</div>
      <div style={{ marginBottom: "4px" }}>
        <span style={labelStyle}>Creator</span>
        <div style={addressStyle}>{bet.creator}</div>
      </div>
      {bet.opponent !== ethers.ZeroAddress && (
        <div style={{ marginTop: "8px" }}>
          <span style={labelStyle}>Opponent</span>
          <div style={addressStyle}>{bet.opponent}</div>
        </div>
      )}
      {bet.isResolved && (
        <div style={{ marginTop: "8px" }}>
          <span style={labelStyle}>Winner</span>
          <div style={addressStyle}>{bet.winner}</div>
        </div>
      )}
      {actions && <div style={{ marginTop: "16px" }}>{actions}</div>}
    </div>
  );
}
