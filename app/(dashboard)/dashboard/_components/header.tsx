import React from 'react'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back! here is an inventory overview.{' '}
        </p>
      </div>
    </div>
  )
}
