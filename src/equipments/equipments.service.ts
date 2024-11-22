import { Injectable } from '@nestjs/common';
import { Prisma, Equipment } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EquipmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEquipmentDto: Prisma.EquipmentCreateInput): Promise<Equipment> {
    return this.databaseService.equipment.create({
      data: createEquipmentDto,
    });
  }

  async findAll(): Promise<Equipment[]> {
    return this.databaseService.equipment.findMany();
  }

  async findOne(id: string): Promise<Equipment> {
    return this.databaseService.equipment.findUnique({
      where: { id },
    });
  }

  async findByHouse(houseId: string): Promise<Equipment[]> {
    return this.databaseService.equipment.findMany({
      where: { houseId },
    });
  }

  async update(id: string, updateEquipmentDto: Prisma.EquipmentUpdateInput): Promise<Equipment> {
    return this.databaseService.equipment.update({
      where: { id },
      data: updateEquipmentDto,
    });
  }

  async remove(id: string): Promise<Equipment> {
    return this.databaseService.equipment.delete({
      where: { id },
    });
  }
}
