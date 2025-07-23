'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

export default function Unauthorized() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(3)

    useEffect(() => {
        // Turunin angka tiap detik
        const interval = setInterval(() => {
          setCountdown((prev) => prev - 1)
        }, 1000)
    
        // Setelah 3 detik redirect
        const timeout = setTimeout(() => {
          router.push('/login')
        }, 3100)
    
        return () => {
          clearInterval(interval)
          clearTimeout(timeout)
        }
    }, [router])

    return (
      <>
      {/* SEO */}
          <Head>
                <title>Halaman Unauthorized</title>
                <meta name="description" content="Halaman jika belum login" />
                <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
                <meta name="author" content="Polsek Bendo" />
                <link rel="canonical" href="https://polsek-bendo.my.id/unauthorized" />
        </Head>
        <div className="flex flex-col m-20 p-5 justify-center items-center">
            Anda belum login atau Anda salah klik.
            <p className="text-lg">Kamu akan diarahkan ke halaman login dalam</p>
            <p className="text-5xl font-mono mt-2 animate-pulse">{countdown}</p>
        </div>
    </>
    )
}