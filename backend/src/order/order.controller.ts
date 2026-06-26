import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/order.dto'

@Controller('')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  // Get Orders
  @HttpCode(HttpStatus.OK)
  @Get('orders')
  @ApiQuery({ name: 'cursor', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'tracking_number', required: false })
  @ApiResponse({ status: 200, description: 'Success' })
  getOrders(
    @Query() param: { cursor: string; limit: string; tracking_number: string },
  ) {
    const cursor = param.cursor
    const limit = param.limit ? parseInt(param.limit) : 10
    return this.orderService.getOrders(cursor, limit, param.tracking_number)
  }

  // Create Order
  @HttpCode(HttpStatus.CREATED)
  @Post('order')
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 200, description: 'Success' })
  createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.create(order)
  }

  // Get Order by Id
  @HttpCode(HttpStatus.OK)
  @Get('order/:orderId')
  @ApiResponse({ status: 200, description: 'Success' })
  getOrder(@Param('orderId') orderId: string) {
    return this.orderService.getOrderById(orderId)
  }

  // Search Tracking Number
  @HttpCode(HttpStatus.OK)
  @Get('order/track/:trackingNumber')
  @ApiResponse({ status: 200, description: 'Success' })
  getOrderByTrackingNumber(@Param('trackingNumber') trackingNumber: string) {
    return this.orderService.getOrderByTrackingNumber(trackingNumber)
  }

  // Update Order
  @HttpCode(HttpStatus.OK)
  @Patch('order/:orderId')
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 200, description: 'Success' })
  patchOrder(@Param('orderId') orderId: string, @Body() order: Partial<CreateOrderDto>) {
    return this.orderService.patchOrder(orderId, order)
  }
}
