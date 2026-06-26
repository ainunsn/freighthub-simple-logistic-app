import { z } from 'zod'

export const orderSchema = z.object({
  tracking_number: z
    .string()
    .min(1, 'Tracking number is required'),

  sender_name: z
    .string()
    .min(1, 'Sender name is required'),

  recipient_name: z
    .string()
    .min(1, 'Recipient name is required'),

  origin: z
    .string()
    .min(1, 'Origin is required'),

  destination: z
    .string()
    .min(1, 'Destination is required'),

  status: z.enum([
    'PENDING',
    'IN_TRANSIT',
    'DELIVERED',
    'CANCELLED',
  ]),
})

export type OrderFormValues = z.infer<typeof orderSchema>