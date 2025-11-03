import { getAllProducts } from '@/app/actions/products.action'
import getCurrentUser from '@/utils/auth'
import { Product } from '@prisma/client'

export default async function EfficiencyChart() {
  const user = await getCurrentUser()
  const allProducts = await getAllProducts(user.id)

  const inStockCount = allProducts.filter(
    (p: Product) => Number(p.quantity) > 5
  ).length
  const lowStockCount = allProducts.filter(
    (p: Product) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1
  ).length

  const outOfStockCount = allProducts.filter(
    (p: Product) => Number(p.quantity) === 0
  ).length

  const inStockPercent =
    allProducts.length > 0
      ? Math.round((inStockCount / allProducts.length) * 100)
      : 0
  const lowStockPercent =
    allProducts.length > 0
      ? Math.round((lowStockCount / allProducts.length) * 100)
      : 0

  return (
    <div className="bg-white  border p-6 border-gray-200 rounded-lg">
      <p className="text-lg font-semibold text-gray-900 mb-6">Efficiency</p>
      <div className="flex items-center size-48 mx-auto relative justify-center">
        <div className="size-48">
          <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
          <div
            className="absolute inset-0 rounded-full border-8 border-blue-600"
            style={{
              clipPath:
                'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {inStockPercent}%
              </div>
              <div className="text-sm text-gray-600">In Stock</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-2  text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-green-500" />
          <span>In Stock ({inStockPercent}%) </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-orange-600" />
          <span>Low Stock ({lowStockPercent}%) </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-600" />
          <span>Out of Stock ({outOfStockCount}%) </span>
        </div>
      </div>
    </div>
  )
}
