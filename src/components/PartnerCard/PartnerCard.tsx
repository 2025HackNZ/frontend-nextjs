"use client"
import React, { useState } from 'react'
import Button from '@/components/Button/Button'
import { PartnerModal } from '@/components/Modal/PartnerModal/PartnerModal'
import { partners } from '@/app/constants/partnerData'
import Image from 'next/image'
interface Project {
  id: string
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
}

export default function PartnerCard({ partnerId }: { partnerId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  // Find the partner by ID
  const partner = partners.find(p => p.id === parseInt(partnerId))
  
  if (!partner) return null
  
  const handleViewProjects = () => {
    // Default to the first project
    setSelectedProject(partner.projects[0] as unknown as Project)
    setIsModalOpen(true)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
  }
  
  return (
    <>
      <div 
        className="flex flex-col items-center p-4 bg-gray-50 rounded-full aspect-square border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
        onClick={handleViewProjects}
      >
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="rounded-full w-full h-full relative">
            <Image 
              src={partner.projects[0].image}
              alt={partner.name} 
              fill
              className="rounded-full object-cover"
            />
          </div>
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