"use client"
import React from 'react'
import PartnerCard from '@/components/PartnerCard/PartnerCard'
import { partners } from '@/app/constants/partnerData'

export default function PartnersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4 py-12">Partners</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          See how your contributions are being used by conservation organizations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partnerId={partner.id.toString()} />
        ))}
      </div>
    </div>
  )
}