import React from 'react'
import './Progress.css'

interface ProgressProps {
  value: number // valor de 0 a 100
}

export const Progress: React.FC<ProgressProps> = ({ value }) => {
  const progressValue = Math.min(Math.max(value, 0), 100)

  return (
    <div className="progress-root" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressValue}>
      <div className="progress-bar" style={{ width: `${progressValue}%` }} />
    </div>
  )
}
