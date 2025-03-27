import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

export function UserProfile() {
  const [user, setUser] = useState<{ email: string; userId: string } | null>(null);

  useEffect(() => {
    axiosInstance
      .get('/auth/profile')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <p>Not logged in or invalid token</p>;

  return (
    <div>
      <h3>Connected user:</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user.userId}</p>
    </div>
  );
}
