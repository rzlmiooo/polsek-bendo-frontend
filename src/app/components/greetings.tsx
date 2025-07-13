'use client'

import { useEffect, useState } from 'react'

export default function UserGreeting() {
  const [username, setUsername] = useState('User')

  useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) {
      setUsername(storedName)
    }
  }, [])

  return username
}