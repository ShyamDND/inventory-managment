import React from 'react'

type Props = {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams: Record<string, string>
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: Props) {
  if (totalPages <= 1) return null
  return <nav>Pagination</nav>
}
