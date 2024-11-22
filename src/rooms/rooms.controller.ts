import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Prisma } from '@prisma/client';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: Prisma.RoomCreateInput) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get('/house/:houseId')
  findByHouse(@Param('houseId') houseId: string) {
    return this.roomsService.findByHouse(houseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
