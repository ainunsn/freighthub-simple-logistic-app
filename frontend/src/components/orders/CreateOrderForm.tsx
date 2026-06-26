'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  orderSchema,
  type OrderFormValues,
} from './schema'
import { useEffect } from 'react'

type Props = {
  onSubmit: (data: OrderFormValues) => void
  isAdd: boolean
  initialValues?: Partial<OrderFormValues>
}

export default function CreateOrderForm({
  onSubmit,
  isAdd,
  initialValues
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      tracking_number: initialValues?.tracking_number ?? '',
      sender_name: initialValues?.sender_name ?? '',
      recipient_name: initialValues?.recipient_name ?? '',
      origin: initialValues?.origin ?? '',
      destination: initialValues?.destination ?? '',
      status: initialValues?.status ?? 'PENDING',
    },
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 bg-white p-6 rounded-lg shadow'
    >
      <h2 className='text-xl font-semibold'>
        {isAdd ? 'Create' : 'Update'} Order
      </h2>

      <div>
        <label className='block mb-1'>
          Tracking Number
        </label>

        {
          !isAdd && <input
            {...register('tracking_number')}
            className='w-full border rounded px-3 py-2 border-teal-600 disabled:opacity-50'
            disabled
          />
        }

        {errors.tracking_number && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.tracking_number.message}
          </p>
        )}
      </div>

      <div>
        <label className='block mb-1'>
          Sender Name
        </label>

        <input
          {...register('sender_name')}
          className='w-full border rounded px-3 py-2 border-teal-600 disabled:opacity-50'

        />

        {errors.sender_name && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.sender_name.message}
          </p>
        )}
      </div>

      <div>
        <label className='block mb-1'>
          Recipient Name
        </label>

        <input
          {...register('recipient_name')}
          className='w-full border rounded px-3 py-2 border-teal-600 disabled:opacity-50'

        />

        {errors.recipient_name && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.recipient_name.message}
          </p>
        )}
      </div>

      <div>
        <label className='block mb-1'>
          Origin
        </label>

        <input
          {...register('origin')}
          className='w-full border rounded px-3 py-2 border-teal-600 disabled:opacity-50'

        />

        {errors.origin && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.origin.message}
          </p>
        )}
      </div>

      <div>
        <label className='block mb-1'>
          Destination
        </label>

        <input
          {...register('destination')}
          className='w-full border rounded px-3 py-2 border-teal-600 disabled:opacity-50'

        />

        {errors.destination && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.destination.message}
          </p>
        )}
      </div>

      {
        !isAdd && <div>
          <label className='block mb-1'>
            Status
          </label>

          <select
            {...register('status')}
            className='w-full border rounded px-3 py-2 border-teal-600 disabled:opacity-50'
          >
            <option value='PENDING'>
              Pending
            </option>

            <option value='IN_TRANSIT'>
              In Transit
            </option>

            <option value='DELIVERED'>
              Delivered
            </option>

            <option value='CANCELLED'>
              Cancelled
            </option>
          </select>

          {errors.status && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.status.message}
            </p>
          )}
        </div>
      }

      <button
        type='submit'
        disabled={isSubmitting}
        className='bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 disabled:opacity-50'
      >
        {isAdd ? 'Create' : 'Update'} Order
      </button>
    </form>
  )
}