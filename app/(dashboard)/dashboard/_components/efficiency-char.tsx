import { getAllProducts } from '@/app/actions/products.action'
import getCurrentUser from '@/utils/auth'

export default async function EfficiencyChart() {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const allProducts = await getAllProducts(user.id)
    if (!allProducts || allProducts.length === 0) {
      return (
        <div className="bg-white border p-6 border-gray-200 rounded-lg text-center text-gray-500">
          No product data available.
        </div>
      )
    }

    const { inStockPercent, lowStockPercent, outOfStockPercent } =
      calculateStockStats(allProducts)

    return (
      <div className="bg-white border p-6 border-gray-200 rounded-lg">
        <p className="text-lg font-semibold text-gray-900 mb-6">Efficiency</p>

        <div className="flex items-center justify-center relative h-48 w-48 mx-auto">
          <svg className="h-48 w-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              className="text-gray-200"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              className="text-blue-600 transition-all duration-700 ease-in-out"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(inStockPercent / 100) * 2 * Math.PI * 80} ${
                2 * Math.PI * 80
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">
              {inStockPercent}%
            </span>
            <span className="text-sm text-gray-600">In Stock</span>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <StockRow
            color="bg-green-500"
            label="In Stock"
            value={inStockPercent}
          />
          <StockRow
            color="bg-orange-500"
            label="Low Stock"
            value={lowStockPercent}
          />
          <StockRow
            color="bg-red-500"
            label="Out of Stock"
            value={outOfStockPercent}
          />
        </div>
      </div>
    )
  } catch (err) {
    console.error('Error loading efficiency chart:', err)
    return (
      <div className="bg-white border p-6 border-gray-200 rounded-lg text-center text-red-600">
        Failed to load efficiency data.
      </div>
    )
  }
}

function calculateStockStats(products: any[]) {
  const total = products.length
  const lowStockThreshold = 5

  const inStockCount = products.filter(
    (p) => Number(p.quantity) > lowStockThreshold
  ).length
  const lowStockCount = products.filter(
    (p) => Number(p.quantity) <= lowStockThreshold && Number(p.quantity) > 0
  ).length
  const outOfStockCount = products.filter(
    (p) => Number(p.quantity) === 0
  ).length

  const toPercent = (count: number) =>
    total > 0 ? Math.round((count / total) * 100) : 0

  return {
    inStockPercent: toPercent(inStockCount),
    lowStockPercent: toPercent(lowStockCount),
    outOfStockPercent: toPercent(outOfStockCount),
  }
}

function StockRow({
  color,
  label,
  value,
}: {
  color: string
  label: string
  value: number
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`size-3 rounded-full ${color}`} />
      <span>
        {label} ({value}%)
      </span>
    </div>
  )
}
