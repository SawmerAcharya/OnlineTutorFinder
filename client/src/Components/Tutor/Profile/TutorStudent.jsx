import React from 'react'
import TutorSlider from './TutorSlider'

export default function TutorStudent() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Sidebar */}

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <TutorSlider />
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 bg-white rounded-lg shadow p-6 flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-800">Students here</h1>
          </div>
          
        </div>
      </div>
    </div>
  )
}
