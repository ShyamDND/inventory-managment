import { AccountSettings } from '@stackframe/stack'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | Stocky - Inventory Management',
  description: ' Settings | Stocky - Inventory Management',
}

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground ">Settings</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Manage your account settings and prefrences
      </p>

      <div className="max-w-6xl bg-white rounded-lg border p-6">
        <AccountSettings fullPage />
      </div>
    </div>
  )
}
