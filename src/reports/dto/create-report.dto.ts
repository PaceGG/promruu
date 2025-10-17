import { IsEnum, IsString } from 'class-validator';
import { ReportType } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';

export class CreateReportDto {
  @IsEnum(ReportType)
  type: ReportType;

  parameters: InputJsonValue;

  @IsString()
  file_ref: string;
}
