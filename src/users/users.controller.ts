import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { UserDto } from '../swagger/user.swagger.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiBody({ type: Object })
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.validateUser(username, password);
    if (!user) throw new HttpException('Identifiants invalides', HttpStatus.UNAUTHORIZED);
    return user;
  }

  @Post('register')
  @ApiBody({ type: UserDto })
  async register(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Get('house/:houseId')
  async findByHouse(@Param('houseId') houseId: string) {
    return this.usersService.findByHouse(houseId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
