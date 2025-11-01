import { getAllProducts } from '@/app/actions/products.action'
import { prisma } from '@/lib/prisma'
import getCurrentUser from '@/utils/auth'
import { TrendingUpIcon } from 'lucide-react'

export const revalidate = 300

export default async function KeyMatrics() {
  const user = await getCurrentUser()

  const [totalProducts, lowStock] = await Promise.all([
    prisma.product.count({
      where: {
        userId: user.id,
      },
    }),
    prisma.product.count({
      where: {
        userId: user.id,
        lowStockAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
  ])
  const allProducts = await getAllProducts(user.id)
  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 ">
      <h2 className="text-2xl font-semibold text-gray-900">Key Matrics</h2>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <div className="text-center">
          <p className="text-3xl font-semibold">{totalProducts}</p>
          <p className="text-sm text-gray-600">Total Products</p>
          <div className="flex items-center justify-center mt-1 gap-1">
            <span className="text-xs text-green-600">+{totalProducts}</span>
            <TrendingUpIcon className="size-3 text-green-600 " />
          </div>
        </div>
        <div className="text-center">
          <p className="text-3xl">${Number(totalValue).toFixed(0)}</p>
          <p className="text-sm text-gray-600">Total Value</p>
          <div className="flex items-center justify-center mt-1 gap-1">
            <span className="text-xs text-green-600">
              +${Number(totalValue).toFixed(0)}
            </span>
            <TrendingUpIcon className="size-3 text-green-600 " />
          </div>
        </div>
        <div className="text-center">
          <p className="text-3xl">{lowStock}</p>
          <p className="text-sm text-gray-600">Total Products</p>
          <div className="flex items-center justify-center mt-1 gap-1">
            <span className="text-xs text-green-600">+{lowStock}</span>
            <TrendingUpIcon className="size-3 text-green-600 " />
          </div>
        </div>
      </div>
    </div>
  )
}

export const KeyMatricsPlaceholder = () => {
  return (
    <div className="w-full h-40 bg-gray-500/10 rounded-lg animate-pulse flex items-center justify-between gap-6 px-6">
      <div className="h-28 w-full rounded-lg bg-gray-500/30 " />
      <div className="h-28 w-full rounded-lg bg-gray-500/30 " />
      <div className="h-28 w-full rounded-lg bg-gray-500/30 " />
    </div>
  )
}
