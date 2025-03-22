
'use client'

import { useState } from "react";
import { parseUnits } from "viem";
import { useAccount, useBalance, useSendTransaction, useWriteContract } from "wagmi";
import { writeContractMutationOptions } from "wagmi/query";
import { sepolia } from 'wagmi/chains';
import { erc20ABI, daoABI, daoContractAddress, nzddContractAddress, nzddDigits } from "../../utils/utils";
import AmountInput from "../Input/Input";

export function ContributeBox() {
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState("0.0")

  const { writeContract } = useWriteContract()
  const { address, isConnected } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address,
    token: nzddContractAddress,
    chainId: sepolia.id,
  });

  const handleContribute = () => {
    // Handle contribution logic here
    console.log(`Contributing ${amount} ETH`)
    // You would typically connect this to your Web3 functionality
    // sendTransaction({
    //   to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    //   value: parseUnits(amount),
    // })
    writeContract({
      abi: erc20ABI,
      address: nzddContractAddress,
      functionName: 'approve',
      args: [
        daoContractAddress,
        parseUnits(amount, nzddDigits),
      ],
    })
    writeContract({
      abi: daoABI,
      address: daoContractAddress,
      functionName: 'deposit',
      args: [
        parseUnits(amount, nzddDigits),
      ]
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        handleContribute(); // Call your contribute function
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
        type="submit" // Makes it trigger on Enter key
        className="bg-secondary rounded-md px-4 py-0.5 text-white font-bold"
        // disabled={!amount || Number(amount) <= 0 || Number(amount) > Number(balance)}
      >
        Contribute
      </button>
    </form>
  );
}

    // <div className="flex flex-col w-full p-4 border border-gray bg-white">
    //   <p className="text-black font-bold">Contribute NZDD</p>
    //   <div className="h-2" />
    //   <AmountInput
    //     value={amount}
    //     balance={isConnected ? `${data?.formatted} ${data?.symbol}` : undefined}
    //     placeholder="Enter amount to contribute"
    //     onChange={setAmount}
    //   />
    //   <div className="h-4" />
    //   <button
    //     onClick={() => handleContribute()}
    //     className="bg-secondary rounded-md px-4 py-0.5 text-white font-bold"
    //     // disabled={!amount || Number(amount) <= 0 || Number(amount) > Number(balance)}
    //   >
    //     Contribute
    //   </button>
    // </div>
