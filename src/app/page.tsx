'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

const Homepage = () => {
  const router = useRouter();
  const session = true; 

  useEffect(() => {
    if (session) {
      router.push('/admin');
    } else {
      router.push('/sign-in');
    }
  }, [session, router]);

  return (
    <div></div>
  )
}

export default Homepage