"use client"

import type * as React from "react"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max: number
  showValue?: boolean
  valueLabel?: string
  variant?: "default" | "success" | "warning"
  thickness?: "thin" | "default" | "thick"
  animated?: boolean
}

export function ProgressBar({
  value,
  max,
  showValue = false,
  valueLabel,
  variant = "default",
  thickness = "default",
  animated = true,
  className = "",
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const getThicknessClass = () => {
    switch (thickness) {
      case "thin": return "h-1"
      case "thick": return "h-3"
      default: return "h-2"
    }
  }

  const getVariantClass = () => {
    switch (variant) {
      case "success": return "bg-green-500"
      case "warning": return "bg-yellow-500"
      default: return "bg-primary"
    }
  }

  return (
    <div className="w-full space-y-1">
      <div
        className={`h-2 w-full overflow-hidden rounded-full bg-secondary ${getThicknessClass()} ${className}`}
        {...props}
      >
        <div
          className={`h-full transition-all duration-300 ease-in-out ${getVariantClass()} ${animated ? 'animate-pulse' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{valueLabel || `${value} / ${max}`}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar;
