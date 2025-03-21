"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"


interface NavbarProps {
  logo: string
}

export default function Navbar({
  logo,
}: NavbarProps) {
  const menuItems = [
    { name: "Plant", href: "/" },
    { name: "Grow", href: "/grow" },
    { name: "Harvest", href: "/harvest" },
  ]

  return (
    <nav className="relative flex flex-col items-center w-full py-4 bg-white border-b border-gray-200">
      {/* Logo on top */}
      <div className="mb-4">
        <Image src={logo || '/next.svg'} alt="Logo" width={120} height={60} className="h-auto" />
      </div>

      {/* Connect wallet button on right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ConnectButton />
      </div>

      {/* Menu at bottom */}
      <div className="flex items-center justify-center space-x-6 mt-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="text-lg font-bold transition-colors hover:text-primary text-black">
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

