import KeyMatrics, { KeyMatricsPlaceholder } from './_components/key-matrics'
import Header from './_components/header'
import StockLevels, { StockLevelsPlaceholder } from './_components/stock-levels'
import { Suspense } from 'react'
import ProductsChart from './_components/products-chart'
import EfficiencyChart from './_components/efficiency-char'

export const revalidate = 300

export default async function Page() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <Suspense fallback={<KeyMatricsPlaceholder />}>
          <KeyMatrics />
        </Suspense>
        <Suspense
          fallback={
            <div className="w-full h-full bg-gray-500/10 rounded-lg animate-pulse" />
          }
        >
          <ProductsChart />
        </Suspense>

        <Suspense fallback={<StockLevelsPlaceholder />}>
          <StockLevels />
        </Suspense>

        <Suspense
          fallback={
            <div className="w-full h-full bg-gray-500/10 rounded-lg animate-pulse" />
          }
        >
          <EfficiencyChart />
        </Suspense>
      </div>
    </>
  )
}
