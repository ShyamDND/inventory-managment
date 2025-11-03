import { ArrowRightIcon, BarChart3Icon, PlayIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Hero({}: Props) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 bg-blue-500/10 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-blue-600 font-medium">
              Manage Your Inventory
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="italic">Inventory</span> Made Simple with Our
              SaaS Platform
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Track, manage, and optimize your inventory from one powerful,
              easy-to-use, secure, scalable, and smart dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={'/sign-in'}
                className="bg-gray-900 text-white px-8 py-4 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition"
              >
                <span>Get Started Now</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition duration-300">
              <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                <BarChart3Icon className="w-16 h-16 text-blue-600 mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-blue-500 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
