
export default function getUserId(){
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];

    const decoded = JSON.parse(atob(payload));

    return decoded?.id || null;
  } catch (error) {
    console.error('Failed to decode token or get user ID:', error);
    return null;
  }
}