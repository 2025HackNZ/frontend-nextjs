"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

// Define the shape of our modal context
type ModalContextType = {
  isOpen: boolean
  modalContent: React.ReactNode | null
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
}

// Create the context with a default value
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Provider component
export function ContributeModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

  const openModal = useCallback((content: React.ReactNode) => {
    setModalContent(content)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    // Clear content after animation completes
    setTimeout(() => {
      setModalContent(null)
    }, 300)
  }, [])

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalContent,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

// Custom hook to use the modal context
export function useContributeModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ContributeModalProvider")
  }
  return context
}

