import Image from "next/image"

interface ProjectDetails {
  id: number
  title: string
  description: string
  image: string
  organization: string
  funding: number
  location: string
  status: string
  achievements?: string
}

interface PartnerModalProps {
  isOpen: boolean
  onClose: () => void
  project: ProjectDetails | null
}

export function PartnerModal({ isOpen, onClose, project }: PartnerModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFF8E1] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
        {/* Title at top */}
        <div className="p-10 pb-6">
          <h2 className="text-4xl font-bold">{project?.title || ""}</h2>
        </div>

        <div className="px-10">
          {/* Image and Details Grid */}
          <div className="flex gap-8 mb-8">
            {/* Left: Image */}
            <div className="w-1/2">
              <div className="h-[350px] relative rounded-xl overflow-hidden">
                <Image
                  src={project?.image || ""}
                  alt={project?.title || ""}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Right: Project Details */}
            <div className="w-1/2 space-y-6">
              <div>
                <p className="text-gray-600 font-medium text-lg">Organization</p>
                <p className="font-semibold text-xl">{project?.organization || ""}</p>
              </div>
              
              <div>
                <p className="text-gray-600 font-medium text-lg">Funding</p>
                <p className="font-semibold text-xl">{project?.funding || 0} NZDD</p>
              </div>
              
              <div>
                <p className="text-gray-600 font-medium text-lg">Location</p>
                <p className="font-semibold text-xl">{project?.location || ""}</p>
              </div>
              
              <div>
                <p className="text-gray-600 font-medium text-lg">Status</p>
                <p className="font-semibold text-xl">{project?.status || ""}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">{project?.description || ""}</p>
            {project?.achievements && (
              <p className="text-gray-700 text-lg leading-relaxed mt-4">{project?.achievements}</p>
            )}
          </div>

          {/* Close button at bottom */}
          <div className="flex justify-center pb-8">
            <button 
              onClick={onClose}
              className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition-colors text-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerModal;