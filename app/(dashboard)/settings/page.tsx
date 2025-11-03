import { AccountSettings } from '@stackframe/stack'

type Props = {}

export default function Page({}: Props) {
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
