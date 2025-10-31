'use server'

import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getAllProducts = cache(async function (userId: string) {
  return await prisma.product.findMany({
    where: {
      userId,
    },
    select: {
      price: true,
      quantity: true,
      createdAt: true,
    },
  })
})
