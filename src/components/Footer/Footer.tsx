import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#252728] text-white py-8 font-sans text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between px-8">
        {/* Logo and About */}
        <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
          <Image src="/logo.svg" alt="Koru Logo" width={150} height={50} className="mb-2" />
          <p className="mb-2 leading-relaxed text-gray-300 text-xs">
            Koru supports conservation projects across New Zealand to protect our unique biodiversity and natural landscapes.
          </p>
        </div>

        {/* Latest Stories */}
        <div className="w-full md:w-1/3 lg:w-2/5 mb-4">
          <h3 className="text-sm mb-3 text-[#c5a460]">Latest Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Link href="/stories/whangamarino-wetland-restoration" className="group">
              <div className="flex items-start space-x-2">
                <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-sm">
                  <Image 
                    src="/StoriesImages/wetland.jpg" 
                    alt="Wetland" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-300 group-hover:text-[#879d3b] transition-colors line-clamp-2">
                    Waikato Wetland Restoration Brings Back Native Birds
                  </p>
                  <span className="text-[10px] text-gray-500">Mar 15, 2025</span>
                </div>
              </div>
            </Link>
            
            <Link href="/stories/taranaki-predator-control-success" className="group">
              <div className="flex items-start space-x-2">
                <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-sm">
                  <Image 
                    src="/StoriesImages/predator.jpg" 
                    alt="Predator Control" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-300 group-hover:text-[#879d3b] transition-colors line-clamp-2">
                    Community-Led Predator Control Thrives in Taranaki
                  </p>
                  <span className="text-[10px] text-gray-500">Mar 2, 2025</span>
                </div>
              </div>
            </Link>
            
            <Link href="/stories" className="text-xs text-[#879d3b] hover:underline mt-2 md:col-span-2">
              View all stories →
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/3 lg:w-1/4 mb-4">
          <h3 className="text-sm mb-2 text-[#c5a460]">Contact Us</h3>
          <div className="space-y-1 text-xs text-gray-300">
            <p><strong>Email:</strong> <a href="mailto:contact@korunz.org" className="hover:text-[#879d3b]">contact@korunz.org</a></p>
            <p><strong>Phone:</strong> +64 4 123 4567</p>
            <p>
              <strong>Address:</strong><br />
              123 Conservation Way<br />
              Wellington 6011<br />
              New Zealand
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-8 pt-3 border-t border-[#444] mt-2">
        <div className="flex justify-center space-x-3 mb-2">
          {[
            { name: 'Facebook', bg: '#3b5998', icon: 'f' },
            { name: 'Twitter', bg: '#00acee', icon: 't' },
            { name: 'Instagram', bg: '#c13584', icon: 'i' },
            { name: 'LinkedIn', bg: '#0e76a8', icon: 'in' },
            { name: 'TikTok', bg: '#000000', icon: 't' }
          ].map((social) => (
            <a
              key={social.name}
              href="#"
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: social.bg }}
            >
              {social.icon}
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400">
          © 2025 Koru Conservation Trust. All rights reserved.
        </p>
      </div>
    </footer>
  )
}