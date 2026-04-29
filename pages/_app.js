// _app.js — Root application wrapper that provides wallet state and layout to all pages

import Navbar from "../components/Navbar";
import useWallet from "../hooks/useWallet";

const globalStyle = {
  background: "linear-gradient(180deg, #0a0a1a 0%, #0f0f23 100%)",
  color: "#fff",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
};

const containerStyle = {
  maxWidth: "720px",
  margin: "0 auto",
  padding: "32px 24px",
};

export default function App({ Component, pageProps }) {
  const { account, connectWallet } = useWallet();

  return (
    <div style={globalStyle}>
      <Navbar account={account} connectWallet={connectWallet} />
      <div style={containerStyle}>
        <Component {...pageProps} account={account} connectWallet={connectWallet} />
      </div>
    </div>
  );
}
