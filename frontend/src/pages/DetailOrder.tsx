import { useParams } from 'react-router-dom'
import CreateOrderForm from '../components/orders/CreateOrderForm'
import { useOrderDetail } from '../hooks/useOrderDetail'
import Spinner from '../components/commons/Spinner'
import ErrorState from '../components/commons/ErrorState'

export default function DetailOrder() {
  const params = useParams()
  const { data, isLoading, error } = useOrderDetail(params?.id)

  if (error) {
    return <ErrorState fullPage />
  }

  if (isLoading) {
    return <div className='flex justify-center items-center'>
      <Spinner />
    </div>
  }

  return <CreateOrderForm
    initialValues={data?.data}
    isAdd={params?.id === 'add'}
    onSubmit={() => {
      console.log('a')
    }}
  />
}