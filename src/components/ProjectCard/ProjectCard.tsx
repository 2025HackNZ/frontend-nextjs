"use client"
import { useState } from "react"
import Image from "next/image"
import Button from "@/components/Button/Button"
import { ProgressBar } from "@/components/ProgressBar/ProgressBar"
import { ProjectModal } from "@/components/Modal/ProjectModal/ProjectModal"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    progress: number
    projectType: string
    iconImage: string
    location: string
    organization: string
    funding: {
      current: number
      target: number
    }
    startDate: string
    endDate: string
    impact: string
    activities: string[]
    votes?: number
    proposalData?: {
      description: string,
      yesVotes: number,
      endTime: any,
      executed: boolean,
      amount: number,
      target: number
    },
  }
  isMember?: boolean
  onVote?: () => void
  className?: string
}

export function ProjectCard({
  project,
  onVote,
  isMember,
  className = ""
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const truncatedDescription = project.description.length > 100
    ? project.description.slice(0, 100) + "..."
    : project.description

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`relative h-[600px] rounded-3xl overflow-hidden shadow-md border border-muted cursor-pointer hover:shadow-lg transition-shadow ${className}`}
      >
        {/* Image positioned above content */}
        <div className="h-2/3 relative">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background">
          <h3 className="text-3xl font-semibold mb-2">{project.title}</h3>
          <h5 className="text-lg font-semibold mb-2">Target: {project?.proposalData?.amount}</h5>
          <p className="text-gray-700 mb-4 text-sm line-clamp-2">{truncatedDescription}</p>

          {/* Progress Bar */}
          <ProgressBar
            value={project.progress}
            max={100}
            thickness="thick"
            variant="success"
            animated={false}
            className="mb-4"
          />

          <div className="flex justify-between items-center">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onVote?.()
              }}
              className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition-colors text-xl"
              disabled={!isMember || project.proposalData?.executed}
            >
              Vote
            </Button>
            <Image src={project.iconImage} width={40} height={40} alt="type icon" />
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />
    </>
  )
}

export default ProjectCard;
