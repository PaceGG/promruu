import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Report } from '@prisma/client';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    return this.prisma.report.create({ data: createReportDto });
  }

  async findAll(): Promise<Report[]> {
    return this.prisma.report.findMany();
  }

  async findOne(report_id: string): Promise<Report | null> {
    return this.prisma.report.findUnique({ where: { report_id } });
  }

  async update(
    report_id: string,
    updateReportDto: UpdateReportDto,
  ): Promise<Report> {
    return this.prisma.report.update({
      where: { report_id },
      data: updateReportDto,
    });
  }

  async remove(report_id: string): Promise<Report> {
    return this.prisma.report.delete({ where: { report_id } });
  }
}
