import { ApiProperty } from '@nestjs/swagger'

export class CreateOrderDto {
  @ApiProperty({
    description: 'Sender Name',
    example: 'John Doe',
  })
  sender_name: string

  @ApiProperty({
    description: 'Recipient Name',
    example: 'Alex Woo',
  })
  recipient_name: string

  @ApiProperty({
    description: 'Origin',
    example: 'Tanjung Perak, Surabaya',
  })
  origin: string

  @ApiProperty({
    description: 'Destination',
    example: 'Tanjung Priok, Jakarta',
  })
  destination: string
}

export class GetOrdersResponseDto {
  @ApiProperty({
    description: 'Destination',
    example: '',
  })
  orders: any[]

  @ApiProperty({
    description: 'Total Data',
    example: '',
  })
  total: number

  @ApiProperty({
    description: 'Next ID',
    example: '',
  })
  next_cursor: string | null

  @ApiProperty({
    description: 'Next ID',
    example: '',
  })
  prev_cursor: string | null

  @ApiProperty({
    description: 'Next ID',
    example: '',
  })
  limit: number
}
