"use client"

import { useEffect, useRef } from "react"
import { useContributeModal } from "@/context/ContributeModalProvider"

export function ContributeModal() {
  const { isOpen, modalContent, closeModal } = useContributeModal()
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeModal])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        overlayRef.current &&
        modalRef.current &&
        overlayRef.current.contains(e.target as Node) &&
        !modalRef.current.contains(e.target as Node)
      ) {
        closeModal()
      }
    }

    window.addEventListener("mousedown", handleClickOutside)
    return () => window.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, closeModal])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen && !modalContent) return null

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`
      }
      aria-modal="true"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto relative transition-all duration-300
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
        `}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close modal"
        >
        </button>
        {modalContent}
      </div>
    </div>
  )
}
