"use client"
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function SponsorsPage() {
  // Distribution data for pie chart
  const distributionData = [
    { name: 'Kiwi Conservation Trust', value: 25, color: '#22C55E' },
    { name: 'Auckland Council', value: 19, color: '#475569' },
    { name: 'Air New Zealand', value: 17, color: '#3B82F6' },
    { name: 'Wellington City Council', value: 15, color: '#8B5CF6' },
    { name: 'Fonterra', value: 13, color: '#06B6D4' },
    { name: 'The Warehouse Group', value: 11, color: '#F97316' },
  ];
  
  // Top industries data
  const topIndustries = [
    { name: 'Wildlife Conservation', value: 28, color: '#22C55E' },
    { name: 'Forest Protection', value: 22, color: '#16A34A' },
    { name: 'Water Conservation', value: 18, color: '#0EA5E9' },
    { name: 'Predator Control', value: 12, color: '#8B5CF6' },
  ];
  
  // Quick stats
  const quickStats = [
    { label: 'Total Sponsors', value: '132' },
    { label: 'Total Contributed', value: '257,850 NZDD' },
    { label: 'Avg. Contribution', value: '1,954 NZDD' },
    { label: 'Projects Funded', value: '24' },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 py-12">Sponsors</h1>
          <p className="text-gray-600">Organizations and individuals making the biggest impact on conservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Distribution Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contribution Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="45%"
                    innerRadius={0}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend 
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => <span style={{ color: '#666666' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Industries + Quick Stats */}
          <div className="space-y-6">
            {/* Top Industries */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Industries</h2>
              <div className="space-y-3">
                {topIndustries.map((industry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: industry.color }}
                      />
                      <span>{industry.name}</span>
                    </div>
                    <span className="font-medium">{industry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, index) => (
                  <div key={index}>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors Table */}
        <div className="bg-white overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sponsor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Industry Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects Supported</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Contribution</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { rank: 1, name: 'Kiwi Conservation Trust', sector: 'Wildlife', projects: 12, contribution: '45,000 NZDD', color: '#22C55E' },
                { rank: 2, name: 'Auckland Council', sector: 'Urban', projects: 8, contribution: '38,750 NZDD', color: '#475569' },
                { rank: 3, name: 'Air New Zealand', sector: 'Carbon', projects: 15, contribution: '35,200 NZDD', color: '#3B82F6' },
                { rank: 4, name: 'Wellington City Council', sector: 'Predator', projects: 6, contribution: '28,500 NZDD', color: '#8B5CF6' },
                { rank: 5, name: 'Fonterra', sector: 'Water', projects: 10, contribution: '25,800 NZDD', color: '#06B6D4' },
                { rank: 6, name: 'The Warehouse Group', sector: 'Planting', projects: 9, contribution: '22,600 NZDD', color: '#F97316' },
                { rank: 7, name: 'Sarah Johnson', sector: 'Wildlife', projects: 4, contribution: '18,900 NZDD', color: '#22C55E' },
                { rank: 8, name: 'Meridian Energy', sector: 'Carbon', projects: 7, contribution: '17,500 NZDD', color: '#F97316' },
                { rank: 9, name: 'University of Auckland', sector: 'Research', projects: 5, contribution: '15,200 NZDD', color: '#8B5CF6' },
                { rank: 10, name: 'John and Mary Smith Foundation', sector: 'Education', projects: 3, contribution: '12,800 NZDD', color: '#EC4899' },
              ].map((sponsor) => (
                <tr key={sponsor.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sponsor.rank}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sponsor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className="px-3 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: sponsor.color }}
                    >
                      {sponsor.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sponsor.projects}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{sponsor.contribution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}