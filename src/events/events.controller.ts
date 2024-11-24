import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { Prisma } from '@prisma/client';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: Prisma.EventCreateInput) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('/house/:houseId')
  findByHouse(@Param('houseId') houseId: string) {
    return this.eventsService.findByHouse(houseId);
  }

  @Get('/equipment/:equipmentId')
  findByEquipment(@Param('equipmentId') equipmentId: string) {
    return this.eventsService.findByEquipment(equipmentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
