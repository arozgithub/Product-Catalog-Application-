'use client'

import { useState } from 'react'
import { CogIcon, EyeIcon } from '@heroicons/react/24/outline'

interface AdminToggleProps {
  isAdminMode: boolean
  onToggle: (enabled: boolean) => void
}

export default function AdminToggle({ isAdminMode, onToggle }: AdminToggleProps) {
  return (
    <button
      onClick={() => onToggle(!isAdminMode)}
      className={`fixed bottom-6 left-6 p-4 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl z-40 ${
        isAdminMode 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-gray-500 hover:bg-gray-600 text-white'
      }`}
      title={isAdminMode ? 'Exit Admin Mode' : 'Enter Admin Mode'}
    >
      {isAdminMode ? (
        <EyeIcon className="h-6 w-6" />
      ) : (
        <CogIcon className="h-6 w-6" />
      )}
    </button>
  )
}