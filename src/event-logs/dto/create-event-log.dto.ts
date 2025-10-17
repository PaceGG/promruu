import { InputJsonValue } from '@prisma/client/runtime/library';
import { IsString, IsOptional } from 'class-validator';

export class CreateEventLogDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsString()
  event_type: string;

  @IsString()
  entity_type: string;

  @IsString()
  entity_id: string;

  details: InputJsonValue;

  @IsOptional()
  @IsString()
  ip_address?: string;
}
