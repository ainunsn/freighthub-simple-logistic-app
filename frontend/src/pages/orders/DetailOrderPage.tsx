import { useNavigate, useParams } from 'react-router-dom'
import CreateOrderForm from '../../components/orders/CreateOrderForm'
import { useOrderDetail } from '../../hooks/useOrderDetail'
import Spinner from '../../components/commons/Spinner'
import ErrorState from '../../components/commons/ErrorState'
import { useSaveOrder } from '../../hooks/useSaveOrder'
import toast from 'react-hot-toast'

export default function DetailOrderPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const isAdd = id === 'add'

  const orderQuery = useOrderDetail(id!)
  const saveOrder = useSaveOrder()

  const onSubmit = async (values: any) => {
    await saveOrder.mutateAsync({
      id,
      data: values,
    })
    toast.success(`Successfully ${isAdd ? 'add' : 'update'} data`)

    navigate('/order')
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

  return <CreateOrderForm
    initialValues={orderQuery.data?.data}
    isAdd={isAdd}
    onSubmit={onSubmit}
  />
}