import React, { useEffect, useState } from "react";
import Web3 from "web3";
const TokenBalanceChecker = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkTokenBalance = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          const tokenAddress = "0xE77aBB1E75D2913B2076DD16049992FFeACa5235"; // Your token contract address
          const balance = await web3.eth.call({
            to: tokenAddress,
            data: web3.eth.abi.encodeFunctionCall(
              {
                name: "balanceOf",
                type: "function",
                inputs: [{ type: "address", name: "account" }],
              },
              [account]
            ),
          });
          setBalance(web3.utils.fromWei(balance, "ether")); // Specify unit 'ether' for ETH
        } else {
          throw new Error("MetaMask extension not detected");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    checkTokenBalance();
  }, []);

  return (
    <div>
      {error && <p>Error checking token balance: {error}</p>}
      {balance !== null && !error && <p>Your token balance: {balance}</p>}
    </div>
  );
};

export default TokenBalanceChecker;
