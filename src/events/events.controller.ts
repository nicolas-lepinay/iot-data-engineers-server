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

  @Get('/house/:houseEsp32Id')
  findByHouse(@Param('houseEsp32Id') houseEsp32Id: string) {
    return this.eventsService.findByHouse(houseEsp32Id);
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
