import Image from "next/image"
import Button from "@/components/Button/Button"
import { ProgressBar } from "@/components/ProgressBar/ProgressBar"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    image: string
    progress?: number
    maxProgress?: number
    projectType?: string
    focus?: string
    impact?: string
    goal?: string
  }
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFF8E1] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black rounded-full p-2 text-white hover:bg-gray-800"
        >
          ✕
        </button>

        {/* Image */}
        <div className="h-[400px] relative">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={800}
            className="object-cover w-full h-full rounded-t-3xl"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
          <p className="text-gray-700 mb-6">{project.description}</p>

          <ProgressBar
            value={project.progress || 50}
            max={project.maxProgress || 100}
            thickness="thick"
            variant="success"
            animated={false}
            className="mb-6"
          />

          {/* Additional Info */}
          <div className="space-y-6 mb-8">
            {project.focus && (
              <div>
                <h3 className="text-2xl font-semibold mb-2">Focus</h3>
                <p className="text-gray-700">{project.focus}</p>
              </div>
            )}
            {project.impact && (
              <div>
                <h3 className="text-2xl font-semibold mb-2">Impact</h3>
                <p className="text-gray-700">{project.impact}</p>
              </div>
            )}
            {project.goal && (
              <div>
                <h3 className="text-2xl font-semibold mb-2">Goal</h3>
                <p className="text-gray-700">{project.goal}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={onClose}
              className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition-colors text-xl"
            >
              Close
            </Button>
            <span className="text-2xl font-medium text-gray-700">{project.projectType}</span>
          </div>
        </div>
      </div>
    </div>
  )
}