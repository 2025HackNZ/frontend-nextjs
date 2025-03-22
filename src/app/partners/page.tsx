"use client"
import React from 'react'
import PartnerCard from '@/components/PartnerCard/PartnerCard'
import { partners } from '@/app/constants/partnerData'

export default function PartnersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2 py-12">Partners</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          See how your contributions are being used by conservation organizations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partnerId={partner.id.toString()} />
        ))}
      </div>
    </div>
  )
}