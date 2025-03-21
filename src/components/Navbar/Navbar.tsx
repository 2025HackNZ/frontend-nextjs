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
    { name: "Contribute", href: "/" },
    { name: "Partners", href: "/partners" },
    { name: "Sponsors", href: "/sponsors" },
  ]

  return (
    <nav className="fixed flex items-center justify-between w-full py-4 border-b border-gray-200 px-2">
      {/* Logo on top */}
      <div className="">
        <Image src={logo} alt="Logo" width={120} height={60} className="h-auto" />
      </div>

      {/* Menu at bottom */}
      <div className="flex items-center justify-center space-x-6 mt-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="text-lg font-bold transition-colors hover:text-primary text-black">
            {item.name}
          </Link>
        ))}
      </div>

      {/* Connect wallet button on right */}
      <div className="">
        <ConnectButton />
      </div>
    </nav>
  )
}

