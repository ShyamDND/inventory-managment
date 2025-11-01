import { deleteProduct } from '@/app/actions/products.action'
import { prisma } from '@/lib/prisma'
import getCurrentUser from '@/utils/auth'
import React from 'react'

type Props = { q: string }

export default async function Table({ q }: Props) {
  const user = await getCurrentUser()
  const products = await prisma.product.findMany({
    where: {
      userId: user.id,
      name: {
        contains: q,
        mode: 'insensitive',
      },
    },
  })
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <THeadData>Name</THeadData>
            <THeadData>SKU</THeadData>
            <THeadData>Price</THeadData>
            <THeadData>Quantity</THeadData>
            <THeadData>Low Stock At</THeadData>
            <THeadData>Actions</THeadData>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <TData>{product.name}</TData>
                <TData>{product.sku || '-'} </TData>
                <TData>{Number(product.price).toFixed(2)}</TData>
                <TData>{product.quantity} </TData>
                <TData>{product.lowStockAt || '-'} </TData>
                <TData>
                  <form
                    action={async (formData: FormData) => {
                      'use server'
                      await deleteProduct(formData)
                    }}
                  >
                    <input type="hidden" name="id" value={product.id} />
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </form>
                </TData>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const THeadData = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
      {children}
    </th>
  )
}
const TData = ({ children }: { children: React.ReactNode }) => {
  return <td className="px-6 py-4  text-gray-500 ">{children}</td>
}
