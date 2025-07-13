import axios from 'axios';

export const AuthService = {
    
  login: async (email, password) => {
    try {
      const baseAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL;

      const response = await axios.post(`${baseAuthUrl}login`, { email, password }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { access_token, refresh_token } = response.data;
      localStorage.setItem('access_token', access_token);
      if (refresh_token) localStorage.setItem('refresh_token', refresh_token);

      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  },

  getAccessToken: () => localStorage.getItem('access_token'),

  isTokenExpired: (token) => {
    if (!token || token.split('.').length !== 3) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Invalid token decode:", error);
      return true;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const baseAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL;

      const response = await axios.post(`${baseAuthUrl}refresh`, { refresh_token: refreshToken });
      localStorage.setItem('access_token', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      AuthService.logout();
      return null;
    }
  },

  getAuthHeaders: async () => {
    let token = AuthService.getAccessToken();
    if (AuthService.isTokenExpired(token)) {
      token = await AuthService.refreshToken();
    }
    return { Authorization: `Bearer ${token}` };
  }
};
