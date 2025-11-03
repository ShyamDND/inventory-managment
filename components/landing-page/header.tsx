import { ZapIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

type Props = {}

export default function Header({}: Props) {
  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <ZapIcon className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-gray-900">Stocky</span>
          </div>

          {/* Desktop Navigation */}

          <div className="flex items-center space-x-4">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({
                  variant: 'default',
                  className: 'rounded-full',
                })
              )}
            >
              Log in
            </Link>
            <Link
              href={'/sign-in'}
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  className: 'rounded-full',
                })
              )}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
