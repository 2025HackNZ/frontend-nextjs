"use client"
import Image from "next/image"
import  Button from "@/components/Button/Button"
// import { ProgressBar } from "@/components/ProgressBar/ProgressBar"

interface ProjectCardProps {
  id: string | number
  title: string
  image: string
  description: string
  votes: number
  onVote?: () => void
  className?: string
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  votes, 
  onVote, 
  className = "" 
}: ProjectCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="relative h-48 w-full">
        <Image 
          src={image || "/placeholder.svg"} 
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-gray-500 mb-3">{description}</p>

        {/* Static Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
          <div 
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: '45%' }}  // You can adjust this static value
          />
        </div>

        {/* Vote count */}
        <div className="text-right text-sm text-gray-500 mb-3">
          {votes.toLocaleString()} votes
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onVote}
        >
          Vote
        </Button>
      </div>
    </div>
  )
}

