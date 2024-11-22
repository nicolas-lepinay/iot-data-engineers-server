import { Injectable } from '@nestjs/common';
import { Prisma, Event } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EventsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventDto: Prisma.EventCreateInput): Promise<Event> {
    return this.databaseService.event.create({
      data: createEventDto,
    });
  }

  async findAll(): Promise<Event[]> {
    return this.databaseService.event.findMany();
  }

    /*
    async findByHouse(houseId: string): Promise<Event[]> {
        const equipments = await this.databaseService.equipment.findMany({
        where: { houseId },
        });
        const equipmentIds = equipments.map((e) => e.id);

        return this.databaseService.event.findMany({
        where: {
            equipmentId: { in: equipmentIds },
        },
        });
    }
    */

  async findByHouse(houseId: string): Promise<Event[]> {
    return this.databaseService.event.findMany({
      where: {
        houseId,
      },
    });
  }

  async findOne(id: string): Promise<Event> {
    return this.databaseService.event.findUnique({
      where: { id },
    });
  }

  async remove(id: string): Promise<Event> {
    return this.databaseService.event.delete({
      where: { id },
    });
  }
}
