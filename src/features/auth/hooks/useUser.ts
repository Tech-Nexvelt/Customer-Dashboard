"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useUser() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (status === 'authenticated' && session?.user) {
        try {
          console.log(`[useUser] Fetching profile: GET /api/user/me`);
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/user/me`, {
            headers: {
              Authorization: `Bearer ${(session.user as any).accessToken}`,
            },
          });

          const userData = await res.json();
          console.log(`[useUser] Profile response:`, userData);

          if (!res.ok) {
            throw new Error('Failed to fetch profile');
          }

          setData(userData);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
        setData(null);
      }
    }

    fetchUserProfile();
  }, [session, status]);

  const updateProfile = async (profileData: any) => {
    if (!session?.user) return null;

    try {
      console.log(`[useUser] Updating profile: PATCH /api/user/profile`, profileData);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/user/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(session.user as any).accessToken}`,
        },
        body: JSON.stringify(profileData),
      });

      const updatedUser = await res.json();
      console.log(`[useUser] Update response:`, updatedUser);

      if (!res.ok) throw new Error('Update failed');
      
      setData(updatedUser);
      return updatedUser;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  const updateNotifications = async (notifData: any) => {
    if (!session?.user) return null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/user/settings/notifications`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(session.user as any).accessToken}`,
        },
        body: JSON.stringify(notifData),
      });

      if (!res.ok) throw new Error('Update failed');
      
      const updatedPrefs = await res.json();
      setData((prev: any) => ({ ...prev, notificationPrefs: updatedPrefs }));
      return updatedPrefs;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return {
    user: data,
    loading: loading || status === 'loading',
    error,
    updateProfile,
    updateNotifications,
    isAuthenticated: status === 'authenticated'
  };
}
