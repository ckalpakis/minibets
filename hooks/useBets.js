// useBets — Custom hook for loading bets from the smart contract
import { useState, useEffect, useCallback } from "react";
import { getReadProvider, getContract } from "../utils/contract";

export default function useBets(filterByAccount = null) {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBets = useCallback(async () => {
    setLoading(true);
    try {
      const provider = getReadProvider();
      const contract = getContract(provider);
      const code = await provider.getCode(contract.target);
      if (code === "0x") {
        console.error("No contract deployed at", contract.target);
        setLoading(false);
        return;
      }
      const count = await contract.getBetsCount();
      const loaded = [];
      for (let i = 0; i < Number(count); i++) {
        const b = await contract.bets(i);
        const bet = {
          id: i,
          creator: b[0],
          opponent: b[1],
          amount: b[2],
          isOpen: b[3],
          isResolved: b[4],
          winner: b[5],
          description: b[6],
        };
        if (!filterByAccount || bet.creator.toLowerCase() === filterByAccount.toLowerCase()) {
          loaded.push(bet);
        }
      }
      setBets(loaded);
    } catch (err) {
      console.error("Error loading bets:", err);
    }
    setLoading(false);
  }, [filterByAccount]);

  useEffect(() => {
    loadBets();
  }, [loadBets]);

  return { bets, loading, reload: loadBets };
}
