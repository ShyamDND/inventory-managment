import React, { Suspense } from 'react'
import AddProductForm from './_components/form'

type Props = {}

export default function AddProduct({}: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground ">Add Product</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Add a new product to your inventory
      </p>

      <Suspense
        fallback={
          <div className="h-[400px] max-w-2xl border bg-gray-500/10 rounded-lg animate-pulse" />
        }
      >
        <AddProductForm />
      </Suspense>
    </div>
  )
}
