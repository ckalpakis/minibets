// useWallet — Custom hook for managing MetaMask wallet connection state
import { useState, useEffect, useCallback } from "react";
import { getProvider } from "../utils/contract";

export default function useWallet() {
  const [account, setAccount] = useState(null);

  const checkWallet = useCallback(async () => {
    const provider = getProvider();
    if (provider) {
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  }, []);

  const connectWallet = useCallback(async () => {
    const provider = getProvider();
    if (!provider) {
      alert("Please install MetaMask!");
      return;
    }
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  }, []);

  useEffect(() => {
    checkWallet();
  }, [checkWallet]);

  return { account, connectWallet };
}
