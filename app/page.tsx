import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-svh overflow-auto w-full flex items-center justify-center p-8">
      <div className="rounded-2xl border-gray-200 bg-gray-50 space-y-4  p-6 max-w-md w-full text-center border">
        <h1 className="text-2xl font-semibold">Inventory Managment</h1>
        <p className="text-sm mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          consequatur sit minima numquam sunt voluptates sint doloribus nemo
          nisi blanditiis laborum illum aspernatur!
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 ">
          <Link
            href={'/sign-in'}
            className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded-xl"
          >
            Sign In
          </Link>
          <Link
            href={'/dashboard'}
            className="text-sm border border-gray-200 rounded-xl px-4 py-1.5"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
