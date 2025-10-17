import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventLog } from '@prisma/client';
import { CreateEventLogDto } from './dto/create-event-log.dto';
import { UpdateEventLogDto } from './dto/update-event-log.dto';

@Injectable()
export class EventLogsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventLogDto: CreateEventLogDto): Promise<EventLog> {
    return this.prisma.eventLog.create({
      data: createEventLogDto,
    });
  }

  async findAll(): Promise<EventLog[]> {
    return this.prisma.eventLog.findMany({
      include: { user: true },
    });
  }

  async findOne(event_id: string): Promise<EventLog | null> {
    return this.prisma.eventLog.findUnique({
      where: { event_id },
      include: { user: true },
    });
  }

  async update(
    event_id: string,
    updateEventLogDto: UpdateEventLogDto,
  ): Promise<EventLog> {
    return this.prisma.eventLog.update({
      where: { event_id },
      data: updateEventLogDto,
    });
  }

  async remove(event_id: string): Promise<EventLog> {
    return this.prisma.eventLog.delete({
      where: { event_id },
    });
  }
}
