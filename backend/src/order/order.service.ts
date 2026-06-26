import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { order, OrderStatus } from 'generated/prisma/client'
import { ulid } from 'ulid'
import { CreateOrderDto, GetOrdersResponseDto, OrderQueryDto } from './dto/order.dto'
import { generateTrackingNumber } from 'src/common/utils/tracking-number.util'

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateOrderDto) {
    await this.prisma.order.create({
      data: {
        id: ulid(),
        sender_name: data.sender_name,
        recipient_name: data.recipient_name,
        origin: data.origin,
        destination: data.destination,
        status: 'PENDING',
        tracking_number: generateTrackingNumber(),
      },
    })
  }

  async getOrders(query: OrderQueryDto): Promise<GetOrdersResponseDto | null> {
    const cursor = query.cursor
    const limit = query.limit ? parseInt(query.limit) : 10

    const orders = await this.prisma.order.findMany({
      where: {
        ...(query.tracking_number && { tracking_number: query.tracking_number }),
        ...(query.status && { status: query.status }),
        ...(query.sender_name && { sender_name: query.sender_name }),
        ...(query.recipient_name && { recipient_name: query.recipient_name }),
        deleted_at: null,
      },
      orderBy: {
        id: 'desc',
      },
      cursor: cursor ? { id: cursor } : undefined,
      take: limit + 1,
    })

    let prevCursor: string | null = null
    if (cursor) {
      const previous = await this.prisma.order.findMany({
        where: { deleted_at: null },
        orderBy: { id: 'desc' },
        cursor: { id: cursor },
        take: -limit - 1,
      })

      prevCursor = previous.length > 1 ? previous[0].id : null
    }

    const hasNextPage = orders.length > limit
    const nextCursor = hasNextPage ? orders[limit].id : null
    const resultUsers = hasNextPage ? orders.slice(0, limit) : orders

    const total = await this.prisma.order.count({
      where: { deleted_at: null },
    })

    return {
      orders: resultUsers,
      total,
      next_cursor: nextCursor,
      prev_cursor: prevCursor,
      limit,
    }
  }

  async getOrderById(orderId: string): Promise<order | undefined | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        deleted_at: null,
      },
    })

    return order
  }

  async getOrderByTrackingNumber(trackingNumber: string): Promise<order | undefined | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        tracking_number: trackingNumber,
        deleted_at: null,
      },
    })

    console.log(order, 'order')

    return order
  }

  async patchOrder(orderId: string, data: Partial<CreateOrderDto>): Promise<order | undefined | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        deleted_at: null,
      },
    })

    if (!order) {
      throw new BadRequestException('Order not found')
    }

    return await this.prisma.order.update({
      where: {
        id: orderId
      },
      data: data
    })
  }

  async cancelOrder(orderId: string): Promise<order | undefined | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        deleted_at: null,
      },
    })

    if (!order) {
      throw new BadRequestException('Order not found')
    }

    if (order.status !== 'PENDING') {
      throw new BadRequestException('Request not valid, only PENDING order can be cancelled')
    }

    return await this.prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: 'CANCELLED'
      }
    })
  }
}
