import * as orderApi from '../api/order.api'
import { useQuery } from '@tanstack/react-query'

export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data } = await orderApi.detailOrder(id)
      return data
    },
    enabled: !!id && id !== 'add'
  })
}