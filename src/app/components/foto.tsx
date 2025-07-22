'use client'

import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import getUserId from '../utils/auth/page'; 
import Image from 'next/image';

export default function UserProfile() {
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | number | null>(null);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const id = getUserId(); 
        setCurrentUserId(id);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !currentUserId) {
        if (!loading && (token === null || currentUserId === null)) {
            console.warn('No token or user ID found after initial check. User is not authenticated for data fetch.');
        }
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const apiUrl = `${baseApiUrl}users`;

        const res = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const userData = res.data.find((u: any) => u.id === currentUserId);

        if (userData) {
          setUserPicture(userData.profile_picture);
        } else {
          console.warn(`User with ID ${currentUserId} not found in the API response.`);
          setUserPicture(null);
        }
      } catch (error) {
        console.error('UserProfile - Effect 2: Failed to fetch user data:', error);
        setUserPicture(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, currentUserId, baseApiUrl]);

  if (loading) {
    return (
      <Image
        src="/profile.png"
        alt="Loading Profile"
        height={50}
        width={50}
        className="p-0.5 bg-sky-50 dark:bg-sky-50 rounded-full w-10 h-10 object-cover"
      />
    );
  }

  return (
    <Suspense>
      <Image
        src={userPicture ? userPicture : "/profile.png"}
        alt="Profile"
        height={50}
        width={50}
        className="p-0.5 bg-sky-50 dark:bg-sky-50 rounded-full w-10 h-10 object-cover"
      />
    </Suspense>
  );
}