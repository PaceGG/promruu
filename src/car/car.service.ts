import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Car } from '@prisma/client';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    return this.prisma.car.create({
      data: createCarDto,
    });
  }

  async findAll(): Promise<Car[]> {
    return this.prisma.car.findMany();
  }

  async findOne(car_id: string): Promise<Car | null> {
    return this.prisma.car.findUnique({
      where: { car_id },
    });
  }

  async update(car_id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    return this.prisma.car.update({
      where: { car_id },
      data: updateCarDto,
    });
  }

  async remove(car_id: string): Promise<Car> {
    return this.prisma.car.delete({
      where: { car_id },
    });
  }
}
