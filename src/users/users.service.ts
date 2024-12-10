import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

type PublicUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.databaseService.user.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return true; // L'utilisateur est valide
    }
    return false; // Identifiants invalides
  }

  async createUser(createUserDto: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword, // Remplace le mot de passe en clair par le mot de passe haché
      },
    });
  }

  async findOne(id: string): Promise<PublicUser> {
    return this.databaseService.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        houseId: true,
        password: false,
      },
    });
  }

  async findAll(): Promise<PublicUser[]> {
    return this.databaseService.user.findMany({
        select: {
            id: true,
            username: true,
            houseId: true,
            password: false,
          },
    });
  }

  async findByHouse(houseId: string): Promise<PublicUser[]> {
    return this.databaseService.user.findMany({
      where: { houseId },
      select: {
        id: true,
        username: true,
        houseId: true,
        password: false,
      },
    });
  }

  async remove(id: string): Promise<User> {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
