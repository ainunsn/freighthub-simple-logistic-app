import * as orderApi from '../api/order.api'
import { useQuery } from '@tanstack/react-query'

export function useTracking(trackingNumber: string) {
  return useQuery({
    queryKey: ['tracking', trackingNumber],
    queryFn: async () => {
      const { data } = await orderApi.trackOrder(trackingNumber!)
      return data.data
    },
    enabled: !!trackingNumber
  })
}