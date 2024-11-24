import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { EquipmentsService } from './equipments.service';
import { EquipmentDto } from '../swagger/equipment.swagger.dto';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Post()
  @ApiBody({type: EquipmentDto})
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
  @ApiBody({type: EquipmentDto})
  update(@Param('id') id: string, @Body() updateEquipmentDto: Prisma.EquipmentUpdateInput) {
    return this.equipmentsService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentsService.remove(id);
  }
}
