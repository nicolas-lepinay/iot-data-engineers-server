import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { Prisma } from '@prisma/client';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Post()
  create(@Body() createEquipmentDto: Prisma.EquipmentCreateInput) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  findAll() {
    return this.equipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findOne(id);
  }

  @Get('/house/:houseId')
  findByHouse(@Param('houseId') houseId: string) {
    return this.equipmentsService.findByHouse(houseId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: Prisma.EquipmentUpdateInput) {
    return this.equipmentsService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentsService.remove(id);
  }
}
