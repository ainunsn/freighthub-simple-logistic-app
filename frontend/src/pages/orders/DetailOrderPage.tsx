import { useNavigate, useParams } from 'react-router-dom'
import CreateOrderForm from '../../components/orders/CreateOrderForm'
import { useOrderDetail } from '../../hooks/useOrderDetail'
import Spinner from '../../components/commons/Spinner'
import ErrorState from '../../components/commons/ErrorState'
import { useSaveOrder } from '../../hooks/useSaveOrder'
import toast from 'react-hot-toast'
import { useCancelOrder } from '../../hooks/useCancelOrder'
import { useState } from 'react'
import ConfirmDialog from '../../components/commons/ConfirmDialog'

export default function DetailOrderPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const isAdd = id === 'add'
  const orderQuery = useOrderDetail(id!)
  const saveOrder = useSaveOrder()
  const cancelOrder = useCancelOrder()

  const [openCancel, setOpenCancel] = useState(false)

  const onSubmit = async (values: any) => {
    await saveOrder.mutateAsync({
      id,
      data: values,
    })
    toast.success(`Successfully ${isAdd ? 'add' : 'update'} data`)

    navigate('/order')
  }

  const handleCancel = async () => {
    try {
      await cancelOrder.mutateAsync(id!)

      toast.success('Order cancelled successfully')

      navigate('/order')
    } catch {
      toast.error('Failed to cancel order')
    } finally {
      setOpenCancel(false)
    }
  }

  if (saveOrder.error) {
    toast.error('Something went wrong')
  }

  if (orderQuery.error) {
    return <ErrorState fullPage />
  }

  if (orderQuery.isLoading) {
    return <div className='flex justify-center items-center'>
      <Spinner />
    </div>
  }

  return <div className='space-y-4 bg-white p-6 rounded-lg shadow'>

    <div className='flex justify-between'>
      <h2 className='text-xl font-semibold'>
        {isAdd ? 'Create' : 'Update'} Order
      </h2>

      {!isAdd && orderQuery.data?.data.status === 'PENDING' && (
        <button
          type='button'
          onClick={() => setOpenCancel(true)}
          disabled={cancelOrder.isPending}
          className='rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50'
        >
          Cancel Order
        </button>
      )}
    </div>

    <CreateOrderForm
      initialValues={orderQuery.data?.data}
      isAdd={isAdd}
      onSubmit={onSubmit}
    />

    <ConfirmDialog
      open={openCancel}
      title='Cancel Order'
      description='Are you sure you want to cancel this order? This action cannot be undone.'
      confirmText='Cancel Order'
      loading={cancelOrder.isPending}
      onClose={() => setOpenCancel(false)}
      onConfirm={handleCancel}
    />
  </div>
}