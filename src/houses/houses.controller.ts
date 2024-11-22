import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HousesService } from './houses.service';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  create(@Body() createHouseDto: Prisma.HouseCreateInput) {
    return this.housesService.create(createHouseDto);
  }

  @Get()
  findAll() {
    return this.housesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: Prisma.HouseUpdateInput) {
    return this.housesService.update(id, updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housesService.remove(id);
  }
}
