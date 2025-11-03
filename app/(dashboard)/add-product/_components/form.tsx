import { createProduct } from '@/app/actions/products.action'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import getCurrentUser from '@/utils/auth'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default async function AddProductForm({}: Props) {
  const user = await getCurrentUser()
  return (
    <div className="max-w-xl bg-white rounded-lg border p-6">
      <form className="space-y-4" action={createProduct}>
        <div className="space-y-2">
          <Label htmlFor="name">Product Name*</Label>
          <Input id="name" name="name" placeholder="Enter product name" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price*</Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="0.0"
              min={'0'}
              step={'0.01'}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity*</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="0.0"
              min={'0'}
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
            min={'0'}
            placeholder="Enter low stock threshold"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button>Add Product</Button>
          <Link
            href={'/inventory'}
            className={buttonVariants({ variant: 'secondary' })}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
