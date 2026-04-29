import Link from "next/link";

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 24px",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  borderBottom: "2px solid #e2b714",
};

const linksStyle = {
  display: "flex",
  gap: "24px",
  alignItems: "center",
};

const brandStyle = {
  color: "#e2b714",
  fontSize: "20px",
  fontWeight: "bold",
  textDecoration: "none",
  marginRight: "16px",
  letterSpacing: "1px",
};

const linkStyle = {
  color: "#ccc",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
  padding: "6px 12px",
  borderRadius: "6px",
  transition: "background 0.2s",
};

const walletBadge = {
  color: "#e2b714",
  fontSize: "13px",
  fontFamily: "monospace",
  background: "rgba(226, 183, 20, 0.1)",
  border: "1px solid rgba(226, 183, 20, 0.3)",
  padding: "6px 14px",
  borderRadius: "20px",
};

const connectBtn = {
  padding: "8px 20px",
  cursor: "pointer",
  background: "linear-gradient(135deg, #e2b714, #f0c836)",
  color: "#1a1a2e",
  border: "none",
  borderRadius: "20px",
  fontWeight: "600",
  fontSize: "14px",
};

export default function Navbar({ account, connectWallet }) {
  return (
    <nav style={navStyle}>
      <div style={linksStyle}>
        <Link href="/" style={brandStyle}>MiniBet</Link>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/create" style={linkStyle}>Create</Link>
        <Link href="/mybets" style={linkStyle}>My Bets</Link>
      </div>
      <div>
        {account ? (
          <span style={walletBadge}>
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <button onClick={connectWallet} style={connectBtn}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
