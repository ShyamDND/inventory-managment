'use server'

import { prisma } from '@/lib/prisma'
import getCurrentUser from '@/utils/auth'
import { redirect } from 'next/navigation'

import { cache } from 'react'
import { z } from 'zod'

const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().nonnegative('Price must be non negative'),
  quantity: z.coerce.number().int().min(1, 'Quantity must be non negative'),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
})

export const getAllProducts = cache(async function (userId: string) {
  return await prisma.product.findMany({
    where: {
      userId,
    },
  })
})

export const deleteProduct = async (formData: FormData) => {
  const user = await getCurrentUser()
  const id = String(formData.get('id')) || ''

  await prisma.product.deleteMany({
    where: {
      id: id,
      userId: user.id,
    },
  })
}

export const createProduct = async (formData: FormData) => {
  const user = await getCurrentUser()

  const parsed = ProductSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    quantity: formData.get('quantity'),
    sku: formData.get('sku') || undefined,
    lowStockAt: formData.get('lowStockAt') || undefined,
  })

  if (!parsed.success) {
    console.error('Validation failed:', parsed.error.flatten().fieldErrors)
    return { success: false, error: 'Invalid product data' }
  }

  try {
    await prisma.product.create({
      data: {
        ...parsed.data,
        userId: user.id,
      },
    })
    return { success: true, redirect: '/inventory' }
  } catch (error) {
    console.error('Failed to create product:', error)
    return { success: false, error: 'Database error' }
  }
}
