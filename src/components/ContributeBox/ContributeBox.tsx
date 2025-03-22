'use client'

import { useState } from "react";
import { parseUnits } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { sepolia } from 'wagmi/chains';
import { erc20ABI, daoABI, daoContractAddress, nzddContractAddress, nzddDigits } from "../../utils/utils";
import AmountInput from "../Input/Input";

export function ContributeBox() {
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false); // Track transaction status

  const { writeContract } = useWriteContract();
  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address,
    token: nzddContractAddress,
    chainId: sepolia.id,
  });

  const handleContribute = async () => {
    if (!amount) return;

    try {
      setIsPending(true); // Disable button and show loading state

      // Approve tokens
      await writeContract({
        abi: erc20ABI,
        address: nzddContractAddress,
        functionName: "approve",
        args: [daoContractAddress, parseUnits(amount, nzddDigits)],
      });

      // Deposit tokens
      await writeContract({
        abi: daoABI,
        address: daoContractAddress,
        functionName: "deposit",
        args: [parseUnits(amount, nzddDigits)],
      });

      setAmount(""); // Reset amount field after successful transaction
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsPending(false); // Re-enable button
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleContribute();
      }}
      className="flex flex-col w-full p-4 border border-gray bg-white"
    >
      <p className="text-black font-bold">Contribute NZDD</p>
      <div className="h-2" />

      <AmountInput
        value={amount}
        balance={isConnected ? `${data?.formatted} ${data?.symbol}` : undefined}
        placeholder="Enter amount to contribute"
        onChange={setAmount}
      />

      <div className="h-4" />

      <button
        type="submit"
        className={`bg-secondary rounded-md px-4 py-0.5 text-white font-bold ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isPending || !amount || Number(amount) <= 0 || Number(amount) > Number(data?.formatted || 0)}
      >
        {isPending ? "Processing..." : "Contribute"}
      </button>
    </form>
  );
}
