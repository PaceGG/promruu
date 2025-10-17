import {
  IsString,
  IsInt,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  ValidationOptions,
} from 'class-validator';
import {
  CarStatus,
  EngineType,
  TransmissionType,
  BodyType,
} from '@prisma/client';

export class CreateCarDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsNumber()
  price: number;

  @IsEnum(CarStatus)
  @IsOptional()
  status?: CarStatus;

  @IsInt()
  mileage: number;

  @IsEnum(EngineType)
  engine_type: EngineType;

  @IsNumber()
  engine_capacity: number;

  @IsInt()
  engine_power: number;

  @IsEnum(TransmissionType)
  transmission: TransmissionType;

  @IsEnum(BodyType)
  body_type: BodyType;

  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsArray()
  @IsString({ each: true } as ValidationOptions)
  features: string[];

  @IsArray()
  @IsString({ each: true } as ValidationOptions)
  images: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
