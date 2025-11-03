import { Metadata } from 'next'
import Table from './_components/table'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Inventory | Stocky - Inventory Management',
  description: ' Inventory | Stocky - Inventory Management',
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: number }>
}) {
  const params = await searchParams
  const q = (params?.q ?? '').trim()
  const page = Number(params.page ?? 1)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
        <p className="text-sm text-gray-500">
          Manage your products and tract inventory levels.
        </p>
      </div>
      <div className="bg-white mb-8  rounded-lg border border-gray-200 overflow-hidden">
        <form action="/inventory" className="flex gap-2" method="GET">
          <input
            type="text"
            name="q"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border-none outline-none border-gray-200 rounded-lg focus:border-transparent"
          />
          <button className="bg-blue-500 px-6 py-2 text-white  hover:bg-blue-700">
            Search
          </button>
        </form>
      </div>
      {/* TABLE */}
      <Suspense
        fallback={
          <div className="h-[400px] bg-gray-500/10 rounded-lg animate-pulse"></div>
        }
      >
        <Table q={q} page={page} />
      </Suspense>
    </div>
  )
}
