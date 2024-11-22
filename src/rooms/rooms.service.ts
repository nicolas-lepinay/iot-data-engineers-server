import { Injectable } from '@nestjs/common';
import { Prisma, Room } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RoomsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRoomDto: Prisma.RoomCreateInput): Promise<Room> {
    return this.databaseService.room.create({
      data: createRoomDto,
    });
  }

  async findAll(): Promise<Room[]> {
    return this.databaseService.room.findMany();
  }

  async findByHouse(houseId: string): Promise<Room[]> {
    return this.databaseService.room.findMany({
      where: { houseId },
    });
  }

  async findOne(id: string): Promise<Room> {
    return this.databaseService.room.findUnique({
      where: { id },
    });
  }

  async remove(id: string): Promise<Room> {
    return this.databaseService.room.delete({
      where: { id },
    });
  }
}
