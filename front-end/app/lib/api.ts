import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    // Get token from localStorage and add to headers
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url} [With Token]`)
      } else {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url} [No Token]`)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Don't log 401 errors for /user endpoint (expected when not logged in)
    if (!(error.response?.status === 401 && error.config?.url?.includes('/user'))) {
      console.error(`API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data)
    }
    return Promise.reject(error)
  }
)
