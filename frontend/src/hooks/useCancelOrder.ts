import { useMutation } from '@tanstack/react-query'
import * as orderApi from '../api/order.api'

export function useCancelOrder() {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await orderApi.cancel(id)
      return res.data.data
    },

  })
}