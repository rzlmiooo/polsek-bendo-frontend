'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Back({ label = "Kembali" }) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-sky-50 rounded-xl transition"
    >
      <ArrowLeftIcon className="w-6 h-auto" />
      <span className="text-xl hidden sm:block">{label}</span>
    </button>
  )
}
