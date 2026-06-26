import { useState } from 'react'
import { useTracking } from '../../hooks/useTracking'

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [submitted, setSubmitted] = useState('')

  const { data, isLoading, isError, } = useTracking(submitted)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(trackingNumber)
    setSubmitted(trackingNumber)
  }

  console.log(data)

  return (
    <div className='max-w-xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>
        Track Order
      </h1>

      <form
        onSubmit={handleSubmit}
        className='flex gap-2 mb-6'
      >
        <input
          value={trackingNumber}
          onChange={(e) =>
            setTrackingNumber(e.target.value)
          }
          placeholder='Enter tracking number'
          className='flex-1 border rounded px-3 py-2 border-teal-600 disabled:opacity-50 focus:ring-teal-700 focus:ring-1 focus:outline-none'

        />

        <button
          type='submit'
          className='bg-teal-600 text-white px-4 py-2 rounded'
        >
          Track
        </button>
      </form>

      {isLoading && (
        <p>Searching...</p>
      )}

      {(isError || !data) && (
        <div className='border border-red-200 rounded p-4 text-center bg-red-100'>
          Order not found.
        </div>
      )}

      {data && (
        <div className='border rounded border-teal-600 p-4 space-y-3'>
          <div>
            <p className='text-sm text-gray-500'>
              Tracking Number
            </p>
            <p className='font-medium'>
              {data.tracking_number}
            </p>
          </div>

          <div>
            <p className='text-sm text-gray-500'>
              Status
            </p>
            <p>{data.status}</p>
          </div>

          <div>
            <p className='text-sm text-gray-500'>
              Sender
            </p>
            <p>{data.sender_name}</p>
          </div>

          <div>
            <p className='text-sm text-gray-500'>
              Recipient
            </p>
            <p>{data.recipient_name}</p>
          </div>

          <div>
            <p className='text-sm text-gray-500'>
              Origin
            </p>
            <p>{data.origin}</p>
          </div>

          <div>
            <p className='text-sm text-gray-500'>
              Destination
            </p>
            <p>{data.destination}</p>
          </div>
        </div>
      )}
    </div>
  )
}