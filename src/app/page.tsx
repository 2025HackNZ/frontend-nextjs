"use client"
import Image from 'next/image'
import { successStories } from '@/app/constants/storiesData'
import { useContributeModal } from '../context/ContributeModalProvider';
import { ContributeBox } from '../components/ContributeBox/ContributeBox';
import { injected, useAccount, useConnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function HomePage() {
  const { openModal } = useContributeModal()
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal();


  const handleContribute = () => {
    if (isConnected) {
      openModal(<ContributeBox />)
    } else {
      // Handle contribution logic
      openConnectModal?.()
    }
  }
  
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section with more spacing */}
        <section className="py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold leading-tight text-slate-800 mb-6">
                  Koru: New Zealand Conservation Platform
                </h1>
                <p className="text-xl text-slate-600 mb-6">
                  Connecting people, funds, and conservation projects across Aotearoa
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Koru is a New Zealand-based conservation platform dedicated to restoring and protecting our land and wildlife. Inspired by the iconic spiral fern, symbolizing new life and growth, Koru directly connects contributors with verified conservation projects across Aotearoa. Our transparent governance model ensures that every contribution is efficiently allocated, preventing stagnation and driving real-world impact. By channeling global investment into ethical and sustainable initiatives, Koru reinvests into local communities, strengthens New Zealand&apos;s clean and green legacy, and fosters a future where conservation and progress go hand in hand.
                </p>
              </div>
              <button onClick={() => handleContribute()} className="bg-[#c5a460] text-white border-2 border-[#c5a460] px-10 py-4 rounded-md hover:bg-[#b39355] hover:border-[#b39355] transition-colors text-lg font-medium">
                Start Contributing
              </button>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              {/* Replace with actual image path */}
              <Image 
                src="/PartnerImages/bird.jpeg" 
                alt="New Zealand Conservation"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-olive/30 mix-blend-overlay"></div>
            </div>
          </div>
        </section>

        {/* Stats Section with increased vertical spacing */}
        <section className="py-20 border-t border-b border-slate-200">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-olive">46,500</h2>
              <p className="text-slate-700 text-xl">NZD Contributed</p>
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-olive">3</h2>
              <p className="text-slate-700 text-xl">Active Projects</p>
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-olive">12</h2>
              <p className="text-slate-700 text-xl">Partner Organizations</p>
            </div>
          </div>
        </section>

        {/* How It Works Section with better spacing */}
        <section className="py-24">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-6">How Koru Works</h2>
          <p className="text-slate-600 text-center max-w-3xl mx-auto mb-16 text-lg">
            Our three-step process makes it easy to contribute to conservation efforts
            across New Zealand and see the real impact of your support.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: 1,
                title: "Contribute",
                description: "Contribute NZD (New Zealand Digital Dollars) to the platform. These funds power your conservation decisions and give you voting rights."
              },
              {
                number: 2,
                title: "Vote",
                description: "Use your voting power to support projects you believe in. Your vote influences how we allocate funds to conservation initiatives."
              },
              {
                number: 3,
                title: "Impact",
                description: "Track real-world impact as partner organizations implement funded projects and report back on progress and outcomes."
              }
            ].map((step) => (
              <div key={step.number} className="relative bg-white p-10 pt-6 rounded-xl shadow-sm hover:shadow-md transition-shadow space-y-6 text-center">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {step.number}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-slate-800">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed mt-4">
                  {step.description}
                </p>
              </div>
            </div>
            ))}
          </div>
        </section>

        {/* Featured Success Stories with proper spacing */}
        <section className="py-24 bg-sage/20 -mx-6 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Featured Success Stories</h2>
            <p className="text-slate-600 max-w-3xl mb-16 text-lg">
              See how our community&apos;s contributions are making a real difference in New Zealand&apos;s ecosystems
            </p>
            
            <div className="grid md:grid-cols-3 gap-10">
              {successStories.slice(0, 3).map((story) => (
                <div 
                  key={story.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2 duration-300"
                >
                  <div className="relative h-64">
                    <Image 
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">{story.title}</h3>
                    <div className="flex justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                      <span>{story.excerpt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-slate-800">Join the Conservation Movement</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Through transparency and community engagement, we&apos;re creating a sustainable future for New Zealand&apos;s unique ecosystems and native species.
            </p>
            <div className="flex justify-center space-x-6">
              <button className="bg-[#c5a460] text-white border-2 border-[#c5a460] px-10 py-4 rounded-md hover:bg-[#b39355] hover:border-[#b39355] transition-colors text-lg font-medium">
                Start Contributing
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
