"use client"

import { useState } from 'react'
import Image from 'next/image'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('contributions')
  
  // Static profile data
  const profileData = {
    name: 'Kia Smith',
    email: 'kia.smith@example.com',
    bio: 'Conservation enthusiast based in Wellington, passionate about native bird protection and forest restoration.',
    stats: [
      { label: 'NZDD Balance', value: '250' },
      { label: 'Total Contributed', value: '1,750' },
      { label: 'Available Votes', value: '150' },
      { label: 'Projects Backed', value: '12' }
    ],
    badges: [
      { 
        icon: '🌱', 
        name: 'First Step', 
        description: 'Made your first contribution to conservation'
      },
      { 
        icon: '🏆', 
        name: 'Conservation Champion', 
        description: 'Contributed over 1,000 NZDD'
      },
      { 
        icon: '🗳️', 
        name: 'Consistent Voter', 
        description: 'Voted in 10+ funding rounds'
      },
      { 
        icon: '🦜', 
        name: 'Wildlife Guardian', 
        description: 'Backed 5+ wildlife projects'
      },
      { 
        icon: '🌿', 
        name: 'Eco Enthusiast', 
        description: 'Supported projects in 3+ categories'
      },
      { 
        icon: '🌊', 
        name: 'Ocean Advocate', 
        description: 'Support 3+ marine projects',
        locked: true
      }
    ],
    contributions: [
      {
        title: 'Kiwi Habitat Restoration',
        organization: 'DOC NZ',
        tags: ['Wildlife', 'Habitat'],
        amount: '500 NZDD contributed',
        date: 'March 15, 2025'
      },
      {
        title: 'Predator Free Wellington',
        organization: 'Predator Free NZ',
        tags: ['Predator', 'Urban'],
        amount: '350 NZDD contributed',
        date: 'February 28, 2025'
      },
      {
        title: 'Kauri Dieback Research',
        organization: 'Forest & Bird',
        tags: ['Forest', 'Disease', 'Research'],
        amount: '400 NZDD contributed',
        date: 'January 10, 2025'
      }
    ],
    votes: [
      {
        title: 'Marine Reserve Expansion',
        organization: 'Marine Conservation NZ',
        tags: ['Marine', 'Conservation'],
        amount: '50 votes allocated',
        date: 'March 18, 2025'
      },
      {
        title: 'Beach Cleanup Initiative',
        organization: 'Sustainable Coastlines',
        tags: ['Coastal', 'Conservation'],
        amount: '30 votes allocated',
        date: 'March 5, 2025'
      }
    ],
    impact: [
      { icon: '🌳', number: '125', label: 'Native Trees Planted' },
      { icon: '🐦', number: '45', label: 'Birds Protected' },
      { icon: '🐀', number: '280', label: 'Pests Removed' },
      { icon: '🌊', number: '5', label: 'Hectares of Marine Area Protected' }
    ]
  }

  const badgeGridColors = (name: string) => { 
    switch (name) {
      case 'First Step':
        return 'border-[#4ade80]'
      case 'Conservation Champion':
        return 'border-[#f97316]'
      case 'Consistent Voter':
        return 'border-[#3b82f6]'
      case 'Wildlife Guardian':
        return 'border-[#8b5cf6]'
      case 'Eco Enthusiast':
        return 'border-[#10b981]'
      case 'Ocean Advocate':
        return 'border-[#9ca3af]'
      default:
        break;
    }
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-6 bg-[var(--color-background)] pt-40">
      {/* Profile Header */}
      <div className="bg-background rounded-lg p-8 shadow-md mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-32 h-32 bg-green-400 rounded-full flex-shrink-0" />
          
          <div className="flex-1 md:pl-8 pt-4 md:pt-0">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{profileData.name}</h1>
            <p className="text-gray-500 mb-2">{profileData.email}</p>
            <p className="mb-6 text-gray-700">{profileData.bio}</p>
            
            <div className="flex flex-wrap gap-8 md:gap-16 mb-6">
              {profileData.stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  <span className="text-sm text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button className="bg-primary hover:bg-primary text-white font-medium px-4 py-2 rounded-md transition-colors">
                Add NZDD Funds
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-md transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Badges Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Conservation Badges</h2>
          <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium">View All</a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {profileData.badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-2">
                <div className={`w-16 h-16 flex items-center justify-center rounded-full border-2 ${badge.locked ? 'opacity-60' : ''}
                  ${badgeGridColors(badge.name)}`}>
                  <span className="text-2xl">{badge.icon}</span>
                </div>
                {/* {badge.locked && (
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 text-xs">
                    🔒
                  </div>
                )} */}
              </div>
              <h3 className="font-medium text-sm mb-1 text-gray-800">{badge.name}</h3>
              <p className="text-xs text-gray-500 leading-tight">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contribution History Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Contribution History</h2>
        
        <div className="border-b border-gray-200 mb-6">
          <div className="flex">
            <button 
              className={`px-5 py-3 font-medium ${activeTab === 'contributions' ? 'text-primary border-b-2 border-primary' : 'text-dark-500'}`}
              onClick={() => setActiveTab('contributions')}
            >
              Contributions
            </button>
            <button 
              className={`px-5 py-3 font-medium ${activeTab === 'votes' ? 'text-primary border-b-2 border-primary' : 'text-dark-500'}`}
              onClick={() => setActiveTab('votes')}
            >
              Votes
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {activeTab === 'contributions' && 
            profileData.contributions.map((item, index) => (
              <div key={index} className="flex p-4 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{item.organization}</p>
                  <div className="flex gap-2 mb-2">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{item.amount}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))
          }
          
          {activeTab === 'votes' && 
            profileData.votes.map((item, index) => (
              <div key={index} className="flex p-4 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{item.organization}</p>
                  <div className="flex gap-2 mb-2">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{item.amount}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      
      {/* Impact Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Conservation Impact</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profileData.impact.map((impact, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="text-3xl mb-4">{impact.icon}</div>
              <div className="text-2xl font-bold text-green-400 mb-1">{impact.number}</div>
              <div className="text-gray-600">{impact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}