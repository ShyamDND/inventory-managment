'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/app/actions/products.action'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function AddProductForm() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleAction(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await createProduct(formData)

      if (!res.success) {
        setError(res.error || 'Something went wrong')
        return
      }

      if (res.redirect) {
        router.push(res.redirect)
      }
    })
  }

  return (
    <div className="max-w-xl bg-white rounded-lg border p-6">
      <form className="space-y-4" action={handleAction}>
        <div className="space-y-2">
          <Label htmlFor="name">Product Name*</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price*</Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="0.0"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity*</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="0"
              min="1"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU (optional)</Label>
          <Input id="sku" name="sku" placeholder="Enter SKU" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lowStockAt">Low Stock At (optional)</Label>
          <Input
            type="number"
            id="lowStockAt"
            name="lowStockAt"
            min="0"
            placeholder="Enter low stock threshold"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
            {error}
          </p>
        )}

        <div className="flex items-center gap-2">
          <Button disabled={isPending}>
            {isPending ? 'Adding...' : 'Add Product'}
          </Button>
          <Link
            href="/inventory"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
