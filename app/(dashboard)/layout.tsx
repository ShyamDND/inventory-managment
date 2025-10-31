import AppSidebar from '@/components/shared/app-sidebar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <AppSidebar />
      {children}
    </div>
  )
}
