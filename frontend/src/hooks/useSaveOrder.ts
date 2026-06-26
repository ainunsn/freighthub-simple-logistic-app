import { useMutation } from '@tanstack/react-query'
import * as orderApi from '../api/order.api'

export function useSaveOrder() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id?: string
      data: any
    }) => {
      if (id && id !== 'add') {
        const res = await orderApi.update(id, data)
        return res.data.data
      }

      const res = await orderApi.createOrder(data)
      return res.data.data
    },
  })
}