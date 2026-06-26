import axios from 'axios'

export const baseURL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 403) {
      localStorage.removeItem('token')
      localStorage.removeItem('is_default_password')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)