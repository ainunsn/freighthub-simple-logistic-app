import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/order.dto'

@Controller('')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  // Get Orders
  @HttpCode(HttpStatus.OK)
  @Get('orders')
  @ApiResponse({ status: 200, description: 'Success' })
  getUsers(
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
  createUser(@Body() user: CreateOrderDto) {
    return this.orderService.create(user)
  }

  // Create Order
  @HttpCode(HttpStatus.CREATED)
  @Get('order/:orderId')
  @ApiResponse({ status: 200, description: 'Success' })
  getOrder(@Param('orderId') orderId: string) {
    return this.orderService.getOrderById(orderId)
  }
}
