"use client"
import React from 'react';
import Image from 'next/image';

// Import the dataset
import { successStories } from '@/app/constants/storiesData';

export default function StoriesPage() {
  return (
    <div className="bg-[var(--background)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 py-12">Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Success stories and achievements from our local conservation initiatives
          </p>
        </div>

        {/* Stories Grid - Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {successStories.slice(0, 4).map((story) => (
            <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{story.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{story.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stories Grid - Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {successStories.slice(4, 8).map((story) => (
            <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{story.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{story.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

