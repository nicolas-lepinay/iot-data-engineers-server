import { Injectable } from '@nestjs/common';
import { Prisma, House } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class HousesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createHouseDto: Prisma.HouseCreateInput): Promise<House> {
    return this.databaseService.house.create({
      data: createHouseDto,
    });
  }

  async findAll(): Promise<House[]> {
    return this.databaseService.house.findMany();
  }

  async findOne(id: string): Promise<House> {
    return this.databaseService.house.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateHouseDto: Prisma.HouseUpdateInput): Promise<House> {
    return this.databaseService.house.update({
      where: { id },
      data: updateHouseDto,
    });
  }

  async remove(id: string): Promise<House> {
    return this.databaseService.house.delete({
      where: { id },
    });
  }
}
