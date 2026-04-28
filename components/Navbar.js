import Link from "next/link";

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 24px",
  backgroundColor: "#1a1a1a",
  borderBottom: "1px solid #333",
};

const linksStyle = {
  display: "flex",
  gap: "20px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
};

const walletStyle = {
  color: "#aaa",
  fontSize: "14px",
};

export default function Navbar({ account, connectWallet }) {
  return (
    <nav style={navStyle}>
      <div style={linksStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/create" style={linkStyle}>Create</Link>
        <Link href="/mybets" style={linkStyle}>My Bets</Link>
      </div>
      <div>
        {account ? (
          <span style={walletStyle}>
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <button onClick={connectWallet} style={{ padding: "8px 16px", cursor: "pointer" }}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
