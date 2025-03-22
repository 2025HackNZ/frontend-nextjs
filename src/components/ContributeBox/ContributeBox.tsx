
'use client'

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useBalance, useSendTransaction, useWriteContract } from "wagmi";
import { writeContractMutationOptions } from "wagmi/query";
import { abi, contractAddress } from "../../utils/utils";
import AmountInput from "../Input/Input";

export default function ContributeBox() {
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState("0.0")

  const { writeContract } = useWriteContract()
  const { address, isConnected } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address,
  });

  const handleContribute = () => {
    // Handle contribution logic here
    console.log(`Contributing ${amount} ETH`)
    // You would typically connect this to your Web3 functionality
    // sendTransaction({
    //   to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    //   value: parseEther(amount),
    // })
    writeContract({
      abi: abi,
      address: contractAddress,
      functionName: 'deposit',
      value: parseEther(amount),
    })
  }

  return (
    <div className="flex flex-col w-full p-4 border border-gray">
      <p className="text-black font-bold">Contribute NZDD</p>
      <div className="h-2" />
      <AmountInput
        value={amount}
        // balance={isConnected ? `${data?.formatted} ${data?.symbol}` : undefined}
        placeholder="Enter amount to contribute"
        onChange={setAmount}
      />
      <div className="h-4" />
      <button
        onClick={() => handleContribute()}
        className="w-full py-6 text-lg bg-black text-white rounded-lg"
        // disabled={!amount || Number(amount) <= 0 || Number(amount) > Number(balance)}
      >
        Contribute
      </button>
    </div>
  );
}
