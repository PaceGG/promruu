import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsJSON,
} from 'class-validator';
import { PaymentStatus, DeliveryMethod, OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @IsString()
  user_id: string;

  @IsString()
  car_id: string;

  @IsJSON()
  order_items: object; // можно уточнить структуру при необходимости

  @IsNumber()
  total_amount: number;

  @IsEnum(PaymentStatus)
  @IsOptional()
  payment_status?: PaymentStatus;

  @IsEnum(DeliveryMethod)
  delivery_method: DeliveryMethod;

  @IsOptional()
  @IsString()
  contact_info?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsJSON()
  history: object;
}
