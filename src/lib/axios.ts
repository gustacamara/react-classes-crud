import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

api.interceptors.response.use((response) => {
  return response
},(err) => {
  if (err.response?.status === 401){
    return window.location.href = "/sign-in"
  }
  return Promise.reject(err)
})