import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CursorPagination from '../../components/commons/CursorPagination'
import DataTable from '../../components/commons/DataTable'
import { useOrder } from '../../hooks/useOrder'
import StatusBadge from '../../components/commons/StatusBadges'
import Spinner from '../../components/commons/Spinner'
import ErrorState from '../../components/commons/ErrorState'

export default function OrderPage() {
  const navigate = useNavigate()
  const [cursor, setCursor] = useState('')
  const { data, isLoading, error } = useOrder(cursor)

  const columns = [
    { header: 'Tracking Number', accessor: 'tracking_number' },
    { header: 'Sender Name', accessor: 'sender_name' },
    { header: 'Recipient Name', accessor: 'recipient_name' },
    { header: 'Origin', accessor: 'origin' },
    { header: 'Destination', accessor: 'destination' },
    {
      header: 'Status', accessor: 'status', render: (row) => {
        return <StatusBadge status={row.status} />
      }
    },
    { header: 'Created At', accessor: 'created_at' },
  ]


  if (error) {
    return <ErrorState fullPage />
  }

  if (isLoading) {
    return <div className='flex justify-center items-center'>
      <Spinner />
    </div>
  }

  return (
    <div className='flex-1 flex flex-col'>

      <main className='p-6'>
        <div className='bg-white p-6 rounded-xl shadow'>
          <div className='flex justify-between'>
            <h2 className='text-xl font-semibold mb-4'>Orders</h2>
            <button
              className='px-3 py-1 border rounded disabled:opacity-50 bg-teal-800 text-white cursor-pointer'
              onClick={() => navigate('/order/add')}
            >Add</button>
          </div>
          <div className='overflow-x-auto mt-10'>
            <DataTable
              columns={columns}
              data={data?.orders || []}
              loading={isLoading}
              onRowClick={(row) => navigate(`/order/${row.id}`)}
            />
          </div>
          <CursorPagination
            prevCursor={data?.prev_cursor}
            nextCursor={data?.next_cursor}
            className='flex items-center mt-4'
            onChange={setCursor}
          />
        </div>
      </main>
    </div>
  )
}