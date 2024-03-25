import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useBalance = () => {
  const auth = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (auth.isAuthenticated) {
      const connection = new Connection("https://api.devnet.solana.com");
      connection.getBalance(new PublicKey(auth.walletAddress)).then((res) => {
        console.log(res);
        setBalance(res / 10 ** 9);
      });
    }
  }, [auth]);
  return balance;
};
export default useBalance;
