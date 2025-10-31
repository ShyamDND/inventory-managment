import getCurrentUser from '@/utils/auth'
import ProductChart from './product-chart'
import { getAllProducts } from '@/app/actions/products.action'

export default async function ProductsChart() {
  const weeklyProductsData = []
  const now = new Date()

  const user = await getCurrentUser()

  const allProducts = await getAllProducts(user.id)

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - i * 7)
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      '0'
    )}/${String(weekStart.getDate() + 1).padStart(2, '0')} `

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt)
      return productDate >= weekStart && productDate <= weekEnd
    })

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    })
  }

  return (
    <div className="p-6  border border-gray-200 rounded-xl bg-white">
      <p className="text-lg font-semibold text-gray-900 mb-6">
        New products per week
      </p>

      <div className="h-48">
        <ProductChart data={weeklyProductsData} />
      </div>
    </div>
  )
}
