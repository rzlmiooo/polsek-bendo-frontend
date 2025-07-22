export default function getUsername() {
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

    return decoded?.username || decoded?.name || null;
  } catch (error) {
    console.error('Failed to decode token or get username:', error);
    return null;
  }
}