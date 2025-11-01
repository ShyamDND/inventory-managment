'use client'
import { cn } from '@/lib/utils'
import { UserButton } from '@stackframe/stack'
import {
  BarChart3,
  ChartBarIncreasing,
  Package,
  Plus,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Add Product', href: '/add-products', icon: Plus },
  { name: 'Settings', href: '/settings', icon: Settings },
]
export default function AppSidebar() {
  const pathname = usePathname()
  const currentPath = pathname.split('/')[pathname.split('/').length - 1]

  return (
    <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-svh p-6 z-10">
      <div className="flex items-center gap-2 mb-8">
        <ChartBarIncreasing className="size-7" />
        <span className="font-bold text-lg">Inventory App</span>
      </div>
      <div className="space-y-1">
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
  )
}
