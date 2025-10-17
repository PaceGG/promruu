import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: createOrderDto,
    });
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: { user: true, car: true },
    });
  }

  async findOne(order_id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { order_id },
      include: { user: true, car: true },
    });
  }

  async update(
    order_id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.prisma.order.update({
      where: { order_id },
      data: updateOrderDto,
    });
  }

  async remove(order_id: string): Promise<Order> {
    return this.prisma.order.delete({
      where: { order_id },
    });
  }
}
