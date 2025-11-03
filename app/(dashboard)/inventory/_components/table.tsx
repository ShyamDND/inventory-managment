import { deleteProduct } from '@/app/actions/products.action'
import { prisma } from '@/lib/prisma'
import { cn } from '@/lib/utils'
import getCurrentUser from '@/utils/auth'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = { q: string; page: number }

export default async function Table({ q, page }: Props) {
  const pageSize = 3
  const user = await getCurrentUser()
  const condition = {
    userId: user.id,
    ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
  }

  const [totalCount, items] = await Promise.all([
    prisma.product.count({
      where: condition,
    }),
    prisma.product.findMany({
      where: condition,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (Number(page) - 1) * pageSize,
      take: pageSize,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const currentPage = Math.max(1, Number(page ?? 1))
  const visiblePages = getVisiblePages()

  function getVisiblePages() {
    const delta = 2
    const range: number[] = []
    const rangeWithDots: any[] = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  function getPageUrl(page: number) {
    const params = new URLSearchParams({ page: page.toString(), q })
    return `/inventory?${params.toString()}`
  }

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full mb-8">
          <thead className="bg-gray-50">
            <tr>
              <THeadData>Name</THeadData>
              <THeadData>SKU</THeadData>
              <THeadData>Price</THeadData>
              <THeadData>Quantity</THeadData>
              <THeadData>Low Stock At</THeadData>
              <THeadData>Actions</THeadData>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((product) => {
              return (
                <tr key={product.id}>
                  <TData>{product.name}</TData>
                  <TData>{product.sku || '-'} </TData>
                  <TData>{Number(product.price).toFixed(2)}</TData>
                  <TData>{product.quantity} </TData>
                  <TData>{product.lowStockAt || '-'} </TData>
                  <TData>
                    <form
                      action={async (formData: FormData) => {
                        'use server'
                        await deleteProduct(formData)
                      }}
                    >
                      <input type="hidden" name="id" value={product.id} />
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </form>
                  </TData>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 my-4">
          <Link
            href={currentPage <= 1 ? '#' : getPageUrl(currentPage - 1)}
            className={cn(
              'flex items-center rounded-lg gap-1 px-3 py-2 text-gray-700 hover:bg-gray-100 bg-white border border-gray-300',
              {
                'text-gray-400 cursor-not-allowed bg-gray-100':
                  currentPage <= 1,
              }
            )}
            aria-disabled={currentPage <= 1}
          >
            <ChevronLeftIcon />
            <span>Previous</span>
          </Link>

          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span key={index} className="px-3 py-2 text-gray-500">
                  ...
                </span>
              )
            }
            const pageNumber = page as number
            const isCurrentPage = pageNumber === currentPage
            return (
              <Link
                href={getPageUrl(pageNumber)}
                key={index}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 bg-white border border-gray-300',
                  {
                    'bg-blue-500 hover:bg-blue-600 text-white': isCurrentPage,
                  }
                )}
              >
                {pageNumber}
              </Link>
            )
          })}
          <Link
            href={currentPage >= totalPages ? '#' : getPageUrl(currentPage + 1)}
            className={cn(
              'flex items-center rounded-lg gap-1 px-3 py-2 text-gray-700 hover:bg-gray-100 bg-white border border-gray-300',
              {
                'text-gray-400 cursor-not-allowed bg-gray-100':
                  currentPage >= totalPages,
              }
            )}
            aria-disabled={currentPage >= totalPages}
          >
            <ChevronRightIcon />
            <span>Next</span>
          </Link>
        </div>
      )}
    </div>
  )
}

const THeadData = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
      {children}
    </th>
  )
}
const TData = ({ children }: { children: React.ReactNode }) => {
  return <td className="px-6 py-4  text-gray-500 ">{children}</td>
}
