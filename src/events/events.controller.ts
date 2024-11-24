import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { EventsService } from './events.service';
import { EventDto } from '../swagger/event.swagger.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiBody({type: EventDto})
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




