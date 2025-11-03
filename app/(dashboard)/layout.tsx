import AppSidebar from '@/components/shared/app-sidebar'
import getCurrentUser from '@/utils/auth'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const user = getCurrentUser()

  return (
    <>
      <AppSidebar />
      <main className="md:ml-64 bg-gray-50 min-h-svh p-4">{children}</main>
    </>
  )
}
