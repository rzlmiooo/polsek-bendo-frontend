'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import getUserId  from '../utils/auth/page';
import Image from 'next/image';

export default function UserProfile() {
  const [userPicture, setUserPicture] = useState(null)
  const [loading, setLoading] = useState(true)
  const userId = getUserId();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) {
        console.warn('No token or user ID found. User is not authenticated.');
        return;
      }

      try {
        const res = await axios.get('https://striking-vision-production-4ee1.up.railway.app/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        console.log(res.data.profile_picture)
        const userData = res.data.find((u :any) => u.id === userId);

        if (userData) {
          setUserPicture(userData.profile_picture)
        }
      } catch (error) {
        console.error('Gagal ambil data user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) return <Image src="/profile.png" alt="Profil" height={50} width={50} className="p-0.5 bg-sky-50 dark:bg-sky-50 rounded-full w-10 h-10 object-cover"/>

  return (
    <Image src={ userPicture ? userPicture : "/profile.png" } alt="Profil" height={50} width={50} className="p-0.5 bg-sky-50 dark:bg-sky-50 rounded-full w-10 h-10 object-cover"></Image>
  )
}