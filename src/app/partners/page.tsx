"use client"

import * as React from "react"
import { ProjectCard } from "@/components/ProjectCard/ProjectCard"

const initialProjects = [
  {
    id: 1,
    title: "Trees That Count",
    image: "/SampleImages/Trees.png",
    description: "A national initiative to plant millions of native trees throughout New Zealand.",
    votes: 100,
    progress: 50,
  },
  {
    id: 2,
    title: "Matariki Tu Rākau",
    image: "/SampleImages/Matariki.jpg", 
    description: "A government-led program launched in 2018 to plant native trees in honor of military service and community well-being.",
    votes: 200,
    progress: 75,
  },
  {
    id: 3,
    title: "Project Crimson — The Living Legends Project",
    image: "/SampleImages/ProjectCrimson.jpg", 
    description: "A project started to protect and restore New Zealand's native pōhutukawa and rātā trees.",
    votes: 300,
    progress: 100,
  },
]

export default function Grow() {
  const [projects, setProjects] = React.useState(initialProjects)

  const handleVote = (projectId: number | string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, votes: project.votes + 10 } : project,
      ),
    )
  }

  return (
    <main className="container mx-auto py-32"> {/* Increased top padding for navbar */}
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            image={project.image}
            description={project.description}
            votes={project.votes}
            onVote={() => handleVote(project.id)}
          />
        ))}
      </div>
    </main>
  )
}