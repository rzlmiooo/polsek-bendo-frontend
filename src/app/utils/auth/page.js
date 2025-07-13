export default function getUserId() {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded?.id || null;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}


