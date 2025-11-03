import getCurrentUser from '@/utils/auth'
import { redirect } from 'next/navigation'

export default async function AuthCheck() {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')
  if (user) redirect('/dashboard')
  return <div />
}
