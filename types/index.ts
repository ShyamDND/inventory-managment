import { Decimal } from '@prisma/client/runtime/library'

export interface TProduct {
  id: string
  name: string
  price: Decimal
  sku?: string
  quantity: number
  lowStockAt?: number
  createdAt?: Date
  updatedAt?: Date
}
