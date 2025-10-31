import { prisma } from '@/lib/prisma'
import { cn } from '@/lib/utils'
import getCurrentUser from '@/utils/auth'

export default async function StockLevels() {
  const user = await getCurrentUser()

  const recent = await prisma.product.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  })

  return (
    <div className="bg-white rounded-lg border-gray-200 p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg  font-semibold text-gray-900">Stock Levels</h2>
      </div>
      <div className="space-y-3">
        {recent.map((product) => {
          const stockLevel =
            product.quantity === 0
              ? 0
              : product.quantity <= (product.lowStockAt || 5)
              ? 1
              : 2
          return (
            <div
              key={product.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
            >
              <div className="flex items-center justify-center gap-2">
                <div
                  className={cn('size-3 rounded-full', {
                    'bg-red-600': stockLevel === 0,
                    'bg-yellow-600': stockLevel === 1,
                    'bg-green-600': stockLevel === 2,
                  })}
                />
                <span>{product.name}</span>
              </div>
              <span
                className={cn('text-sm font-medium', {
                  'text-red-600': stockLevel === 0,
                  'text-yellow-600': stockLevel === 1,
                  'text-green-600': stockLevel === 2,
                })}
              >
                {product.quantity}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const StockLevelsPlaceholder = () => {
  return (
    <div className="w-full gap-y-4 grid bg-gray-500/10 rounded-lg animate-pulse  gap-6  p-6">
      <div className="h-10 w-full rounded-lg bg-gray-500/30 " />
      <div className="h-10 w-full rounded-lg bg-gray-500/30 " />
      <div className="h-10 w-full rounded-lg bg-gray-500/30 " />
      <div className="h-10 w-full rounded-lg bg-gray-500/30 " />
    </div>
  )
}
