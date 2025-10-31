import { SignIn } from '@stackframe/stack'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Page({}: Props) {
  return (
    <div className="h-svh flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto p-6 bg-gradiet-to-tr from-white to-gray-100 rounded-lg shadow-md border border-gray-200">
        <SignIn />
        <div className="w-full mt-4 text-center ">
          <Link
            href="/"
            className="w-full border border-gray-200 text-sm rounded-md block mt-2 px-4 py-1.5 text-center"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
