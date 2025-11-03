import { Package, TrendingUp, ZapIcon } from 'lucide-react'
import Hero from '@/components/landing-page/hero'
import Header from '@/components/landing-page/header'
import Link from 'next/link'
import { Suspense } from 'react'
import AuthCheck from '@/components/landing-page/auth-check'

export default function StocklyLanding() {
  const trustedCompanies = [
    'SERRA VIEW',
    'Mount Health',
    'MERCY ONE',
    'St Peters Health',
    'MAKhiglam Hospital',
    'SCA Health',
    'BrownCare',
    'Redefine',
  ]

  const features = [
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Smart Storeroom',
      description:
        'Use barcodes scanning to quickly identify and trigger restocking processes.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Supply Manager',
      description:
        'Instantly update products with your suppliers. Streamline your purchasing workflow.',
    },
  ]

  return (
    <div className="min-h-screen ">
      <Suspense fallback={<div />}>
        <AuthCheck />
      </Suspense>
      {/* Navigation */}
      <Header />
      <Hero />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            10k+ Business Company Trust Our Platform
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Track, manage, and optimize your inventory from one powerful,
            easy-to-use, secure, scalable, and smart dashboard.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {trustedCompanies.map((company, index) => (
              <div
                key={index}
                className="text-center text-gray-400 font-semibold hover:text-emerald-600 transition"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-linear-to-br from-gray-100 to-gray-50 rounded-3xl p-8 shadow-2xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">
                    Dashboard Overview
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="text-sm text-emerald-600 mb-1">
                      Total Stock
                    </div>
                    <div className="text-2xl font-bold text-emerald-700">
                      800
                    </div>
                    <div className="text-xs text-emerald-600">
                      Current Stock Level
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">In Transit</div>
                    <div className="text-2xl font-bold text-blue-700">245</div>
                    <div className="text-xs text-blue-600">Items Shipping</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-orange-600 mb-1">
                      Low Stock
                    </div>
                    <div className="text-2xl font-bold text-orange-700">12</div>
                    <div className="text-xs text-orange-600">
                      Needs Attention
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Shipping Performance</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>On-time Delivery</span>
                        <span className="font-medium">96%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[96%]"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">
                      Customer Satisfaction
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#10b981"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray="351.86"
                            strokeDashoffset="35.19"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold">960</div>
                            <div className="text-xs text-gray-500">Reviews</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                How it works? <span className="text-emerald-400">3X</span>
                <div className="text-2xl italic mt-2">Save your time</div>
              </h2>
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-emerald-500 p-3 rounded-lg shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
                alt="Professional working"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            10k+ Business Company Trust Our Platform
          </h2>
          <p className="text-gray-300 mb-8">
            Track, manage, and optimize your inventory from one powerful,
            easy-to-use, secure, scalable, and smart dashboard.
          </p>
          <Link
            href={'/sign-in'}
            className="bg-primary text-white px-8 py-4 rounded-full hover:bg-blue-600 transition text-lg font-semibold"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ZapIcon className="w-6 h-6 text-primary" />

            <span className="text-xl font-bold text-white">Stocky</span>
          </div>
          <p className="mb-4">© 2024 Stockly. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-emerald-500 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-500 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-500 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
