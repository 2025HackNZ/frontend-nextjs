"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface AmountInputProps {
  value: string
  balance?: string
  onChange: (value: string) => void
  placeholder?: string
  min?: number
  max?: number
  className?: string
}

export default function AmountInput({
  value,
  balance,
  onChange,
  placeholder = "Enter amount",
  min = 0,
  max,
  className = "",
}: AmountInputProps) {
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // Only allow numbers and decimals
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      onChange(newValue)

      // Validate min/max if needed
      if (newValue !== "" && Number(newValue) < min) {
        setError(`Minimum amount is ${min}`)
      } else if (max !== undefined && Number(newValue) > max) {
        setError(`Maximum amount is ${max}`)
      } else {
        setError(null)
      }
    }
  }

  useEffect(() => {
    // Revalidate when props change
    if (value !== "" && Number(value) < min) {
      setError(`Minimum amount is ${min}`)
    } else if (max !== undefined && value !== "" && Number(value) > max) {
      setError(`Maximum amount is ${max}`)
    } else {
      setError(null)
    }
  }, [value, min, max])

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`text-lg text-black ${className} ${error ? "border-destructive" : ""} p-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:border-primary placeholder-gray-500 bg-white`}
        />
        {/* {balance &&
          <p className="text-sm text-muted-foreground text-right text-black">Balance: {balance} ETH</p>
        } */}
      </div>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  )
}

