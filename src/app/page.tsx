'use client'

import AmountInput from "../components/Input/Input";
import { useState } from "react";
import { parseEther } from "viem";
import { useSendTransaction } from "wagmi";

export default function Home() {
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState("1.25")
  const { sendTransaction } = useSendTransaction()

  const handleContribute = () => {
    // Handle contribution logic here
    console.log(`Contributing ${amount} ETH`)
    // You would typically connect this to your Web3 functionality
    sendTransaction({
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther(amount),
    })
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="container mx-auto py-12 px-4 max-w-md">
          <div className="flex flex-col items-center space-y-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center">Contribute to Our Project</h1>

            <div className="w-full space-y-2">
              {/* Input Component */}
              <AmountInput value={amount} onChange={setAmount} placeholder="Enter amount to contribute" />

              {/* Balance Display */}
              <p className="text-sm text-muted-foreground text-right">Balance: {balance} ETH</p>
            </div>
            <div>
              <button 
                onClick={() => handleContribute()}
                className="w-full py-6 text-lg"
                // disabled={!amount || Number(amount) <= 0 || Number(amount) > Number(balance)}
                >
                  Contribute
                </button>
            </div>

            {/* Contribute Button */}
            {/* <Button
              onClick={handleContribute}
              className="w-full py-6 text-lg"
              disabled={!amount || Number(amount) <= 0 || Number(amount) > Number(balance)}
            >
              Contribute
            </Button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
