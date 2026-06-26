import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'generated/prisma/enums';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Sender Name',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  sender_name: string

  @ApiProperty({
    description: 'Recipient Name',
    example: 'Alex Woo',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  recipient_name: string

  @ApiProperty({
    description: 'Origin',
    example: 'Tanjung Perak, Surabaya',
    required: true

  })
  @IsString()
  @IsNotEmpty()
  origin: string

  @ApiProperty({
    description: 'Destination',
    example: 'Tanjung Priok, Jakarta',
    required: true

  })
  @IsString()
  @IsNotEmpty()
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

export class OrderQueryDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsString()
  tracking_number?: string;

  @IsOptional()
  @IsString()
  status?: OrderStatus;

  @IsOptional()
  @IsString()
  sender_name?: string;

  @IsOptional()
  @IsString()
  recipient_name?: string;
}
