import { api } from './axios'

export const listOrder = (cursor: string) => api.get(`/orders?limit=5&cursor=${cursor}`)
export const createOrder = (data: any) => api.post('/order', data)
export const detailOrder = (id: string) => api.get(`/order/${id}`)
export const update = (id: string, data) => api.patch(`/order/${id}`, data)
export const trackOrder = (trackingNumber: string) => api.get(`/order/track/${trackingNumber}`)