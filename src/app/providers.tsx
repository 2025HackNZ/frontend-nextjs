'use client';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { config } from "../../config"

import {
  mainnet,
  sepolia
} from 'wagmi/chains';

const queryClient = new QueryClient();

// const rainbowConfig = getDefaultConfig({
//   appName: 'web3-nz-hackathon',
//   projectId: 'd318b29914fb957cf18957b9bca89adf',
//   chains: [mainnet, sepolia],
// });

export const Provider = ({children}: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Provider