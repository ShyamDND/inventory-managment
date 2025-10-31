import { stackServerApp } from '@/stack/server'
import { redirect } from 'next/navigation'
import { cache } from 'react'

const getCurrentUser = cache(async () => {
  const user = await stackServerApp.getUser()
  if (!user) {
    redirect('/sign-in')
  }
  return user
})

export default getCurrentUser
