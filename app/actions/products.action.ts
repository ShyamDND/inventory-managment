'use server'

import { prisma } from '@/lib/prisma'
import getCurrentUser from '@/utils/auth'
import { cache } from 'react'

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
