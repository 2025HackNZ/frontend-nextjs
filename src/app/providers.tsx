'use client';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider, http } from "wagmi"

import {
  mainnet,
  sepolia
} from 'wagmi/chains';
import { ContributeModalProvider } from '@/context/ContributeModalProvider';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'web3-nz-hackathon',
  projectId: 'd318b29914fb957cf18957b9bca89adf',
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/JYWLuOthU8sE_RW4F18LDKQjtiUzugEw'),
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/JYWLuOthU8sE_RW4F18LDKQjtiUzugEw'),
  },
  // ssr: true,
});

export const Provider = ({children}: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >
          <ContributeModalProvider>
            {children}
          </ContributeModalProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Provider
