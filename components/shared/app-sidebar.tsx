'use client'
import { cn } from '@/lib/utils'
import { UserButton } from '@stackframe/stack'
import {
  BarChart3,
  ChartBarIncreasing,
  Package,
  Plus,
  Settings,
  Sidebar,
  ZapIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useIsMobile } from '@/hooks/use-mobile'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Add Product', href: '/add-product', icon: Plus },
  { name: 'Settings', href: '/settings', icon: Settings },
]
export default function AppSidebar() {
  const pathname = usePathname()
  const currentPath = pathname.split('/')[pathname.split('/').length - 1]
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(true)
    }
  }, [isSidebarOpen])

  return (
    <div className="relative">
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full inset-0 bg-black/10 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={cn(
          'fixed left-0 top-0 duration-300 bg-gray-900 text-white w-64 min-h-svh  z-20',
          { '-left-64': !isSidebarOpen }
        )}
      >
        <div className="flex items-center gap-2 mb-4 md:mb-8 border-b border-gray-700 md:p-6 p-3">
          <ZapIcon className="size-7" />
          <span className="font-bold text-lg">Stocky</span>
        </div>
        <div className="space-y-1 px-3 md:px-6">
          {navigation.map((item, key) => {
            const isActive = '/' + currentPath === item.href

            return (
              <Link
                key={key}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 py-2 rounded-lg px-3',
                  {
                    'bg-blue-100 text-gray-800': isActive,
                  }
                )}
                onClick={() => {
                  if (isMobile) setIsSidebarOpen(false)
                }}
              >
                {item.icon && <item.icon className="size-5" />}
                <span className="text-sm">{item.name}</span>
              </Link>
            )
          })}
        </div>

        <div className="absolute left-0 bottom-0 w-full p-6 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <UserButton showUserInfo />
          </div>
        </div>
      </div>
      <Button
        variant={'secondary'}
        className="fixed right-2 top-2 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Sidebar />
      </Button>
    </div>
  )
}
