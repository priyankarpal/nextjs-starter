'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const requestAccess = async () => {
  try {
    const response = await fetch('/api/request-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'employee@example.com' }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      }
    }
  } catch (error) {
    console.error('Access request error:', error);
  }
};

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    requestAccess();
  }, []);

  const handleNavigate = () => {
    const permitSession = document.cookie.split('; ').find(row => row.startsWith('permit_session='));

    if (permitSession) {
      router.push('/employee-dashboard');
    } else {
      router.push('/employee-access');
    }
  };

  return (
    <div>
      <button onClick={handleNavigate} style={{ margin: '10px' }}>
        Check Employee Access
      </button>
    </div>
  );
};

export default HomePage;
