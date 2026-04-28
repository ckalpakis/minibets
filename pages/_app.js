import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getProvider } from "../utils/contract";

const globalStyle = {
  backgroundColor: "#0f0f0f",
  color: "#fff",
  minHeight: "100vh",
  fontFamily: "sans-serif",
};

const containerStyle = {
  maxWidth: "700px",
  margin: "0 auto",
  padding: "24px",
};

export default function App({ Component, pageProps }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    checkWallet();
  }, []);

  async function checkWallet() {
    const provider = getProvider();
    if (provider) {
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  }

  async function connectWallet() {
    const provider = getProvider();
    if (!provider) {
      alert("Please install MetaMask!");
      return;
    }
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  }

  return (
    <div style={globalStyle}>
      <Navbar account={account} connectWallet={connectWallet} />
      <div style={containerStyle}>
        <Component {...pageProps} account={account} connectWallet={connectWallet} />
      </div>
    </div>
  );
}
