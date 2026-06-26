// import { useState } from 'react'
import * as orderApi from '../api/order.api'

// type Order = {
//   orders: {
//     id: string,
//     sender_name: string,
//     recipient_name: string,
//     origin: string,
//     destination: string,
//     status: string,
//     created_at: string
//   }[],
//   next_cursor: string, prev_cursor: string, limit: number, total: number
// }

// export function useOrder() {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [data, setData] = useState<Order>(null)

//   const getEmployees = async (cursor: string) => {
//     setLoading(true)
//     try {
//       const res = await orderApi.listOrder(cursor)
//       setData(res.data.data)
//       return res.data.data
//     } catch (err) {
//       const message = err.response?.data?.message || err.message
//       setError(message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return { getEmployees, loading, error, data }
// }

import { useQuery } from '@tanstack/react-query'

export function useOrder(cursor: string) {
  return useQuery({
    queryKey: ['orders', cursor],
    queryFn: async () => {
      const { data } = await orderApi.listOrder(cursor)
      return data.data
    }
  })
}