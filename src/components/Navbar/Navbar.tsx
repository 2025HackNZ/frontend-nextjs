"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit"
import { useContributeModal } from "@/context/ContributeModalProvider"
import { ContributeBox } from "@/components/ContributeBox/ContributeBox"
import { useAccount } from "wagmi"

interface NavbarProps {
  logo: string
}

export default function Navbar({
  logo,
}: NavbarProps) {
  const menuItems = [
    { name: "Projects", href: "/projects" },
    { name: "Partners", href: "/partners" },
    { name: "Sponsors", href: "/sponsors" },
  ]
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { openModal } = useContributeModal()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleContribute = () => {
    if (isConnected) {
      openModal(<ContributeBox />)
    } else {
      // Handle contribution logic
      openConnectModal?.()
    }
  }

  return (
    <nav className="fixed flex items-center justify-between w-full py-4 border-b border-gray-200 px-2 bg-background z-10">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image src={logo} alt="Logo" width={120} height={60} className="h-auto" />
        </Link>
      </div>

      {/* Menu items */}
      <div className="flex items-center justify-center space-x-6 mt-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-lg font-bold transition-colors hover:text-primary text-black px-4 rounded-md ${
              pathname === item.href ? "bg-secondary text-white" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
        <button className="bg-secondary rounded-md px-4 py-0.5 text-white font-bold" onClick={() => handleContribute()}>Contribute</button>
        {/* Custom Connect wallet button */}
        <div className="relative" ref={dropdownRef}>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading'
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated')

              return (
                <div
                  className={!ready ? 'opacity-0 pointer-events-none select-none' : ''}
                  aria-hidden={!ready}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="bg-secondary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Connect Wallet
                        </button>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Wrong Network
                        </button>
                      )
                    }

                    return (
                      <div className="relative">
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          type="button"
                          className="flex items-center rounded-lg py-2 px-4 transition-colors"
                        >
                          <Image src={'/profile.png'} alt="profile placeholder" width={30} height={30} />
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            {/* User info header */}
                            <div className="p-4 border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-400 rounded-full mr-3"></div>
                                <div>
                                  <p className="font-medium text-gray-800">{account.displayName}</p>
                                  <p className="text-gray-600">{account.displayBalance}</p>
                                </div>
                              </div>
                            </div>

                            {/* Menu options */}
                            <div className="py-2">
                              <Link href="/profile" className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors">
                                <div className="text-blue-600 mr-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">View Profile</span>
                              </Link>

                              <Link href="/" className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors">
                                <div className="text-yellow-600 mr-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">Add NZDD Funds</span>
                              </Link>

                              <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors">
                                <div className="text-red-600 mr-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">Help Center</span>
                              </Link>

                              <button
                                onClick={openAccountModal}
                                className="w-full text-left flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                              >
                                <div className="text-brown-500 mr-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">Log Out</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </div>

    </nav>
  )
}
