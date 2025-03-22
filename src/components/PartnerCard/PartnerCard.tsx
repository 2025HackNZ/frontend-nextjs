"use client"
import React, { useState } from 'react'
import { PartnerModal } from '@/components/Modal/PartnerModal/PartnerModal'
import { partners } from '@/app/constants/partnerData'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  image: string
  progress: number
  maxProgress: number
  projectType: string
  currentDonations: number
  donationTarget: number
  treesPlanted: number
  goal: string
  organization: string
  funding: number
  location: string
  status: string
}

export default function PartnerCard({ partnerId }: { partnerId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const partner = partners.find(p => p.id === parseInt(partnerId))
  
  if (!partner) return null
  
  const handleViewProjects = () => {
    setSelectedProject(partner.projects[0] as unknown as Project)
    setIsModalOpen(true)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
  }
  
  return (
    <>
      <div 
        className="flex flex-col bg-white rounded-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
        onClick={handleViewProjects}
      >
        {/* Image section */}
        <div className="w-full h-48 relative">
          <Image 
            src={partner.projects[0].image}
            alt={partner.name} 
            fill
            className="object-cover"
          />
        </div>
        
        {/* Info section */}
        <div className="p-4 text-center">
          <h3 className="font-semibold text-lg mb-2">{partner.name}</h3>
          <p className="text-green-600 font-medium">{partner.amount} NZDD</p>
        </div>
      </div>
      
      <PartnerModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject as Project}
      />
    </>
  )
}