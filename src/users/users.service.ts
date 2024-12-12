import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

type PublicUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async validateUser(username: string, password: string): Promise<User> | null {
    const user = await this.databaseService.user.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // L'utilisateur est valide
    }
    return null; // Identifiants invalides
  }

  async createUser(createUserDto: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
        return this.databaseService.user.create({
            data: {
              ...createUserDto,
              password: hashedPassword, // Remplace le mot de passe en clair par le mot de passe haché
            },
          },
        );
    } catch(error) {
        if (error.meta?.target?.includes('username')) {
            // Gestion spécifique de la violation de contrainte unique sur le champ 'username'
            throw new HttpException({ 
                message: "Le nom d'utilisateur est déjà pris.", 
                success: false, 
            },
              HttpStatus.CONFLICT,
            );
          }
          // Si une autre erreur survient, relancer l'exception
          throw error;
    }
  }

  async findOne(identifier: string): Promise<PublicUser> {
    const user = await this.databaseService.user.findFirst({
        where: {
            OR: [
              { id: identifier },
              { username: identifier },
            ],
          },
      select: {
        id: true,
        username: true,
        houseId: true,
        password: false,
      },
    });
    if (!user) {
        throw new HttpException('Utilisateur non trouvé.', HttpStatus.NOT_FOUND);
      }
      return user;
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
