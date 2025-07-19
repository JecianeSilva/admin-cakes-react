import axios from 'axios'
import { environment } from './../../enrironments'
import { getLocalStorage } from '../../utils/localStorage'
import { setLocalStorage } from '../../utils/localStorage'

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

export const authenticationApi = axios.create({
  baseURL: environment.API_URL,
})

export const authorizedApi = axios.create({
  baseURL: environment.API_URL,
})

authorizedApi.interceptors.request.use((config) => {
  const token = getLocalStorage('access_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

authorizedApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (originalRequest._retry || !error.response) {
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(authorizedApi(originalRequest))
            },
            reject: (err: any) => reject(err),
          })
        })
      }

      isRefreshing = true

      try {
        const refreshToken = getLocalStorage<string>('refresh_token')
        if (!refreshToken) throw new Error('Refresh token not found')

        const { data } = await authenticationApi.post('/cakes-bff/auth/refresh-token', {
          refreshToken,
        })

        const newAccessToken = data.access_token
        setLocalStorage('access_token', newAccessToken)

        processQueue(null, newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return authorizedApi(originalRequest)
      } catch (err) {
        processQueue(err, null)
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)