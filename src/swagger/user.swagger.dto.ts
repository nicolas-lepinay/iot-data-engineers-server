import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements Prisma.UserCreateInput {

    @ApiProperty({ description: "Nom d'utilisateur", example: "Napoléon" })
    username: string;

    @ApiProperty({ description: "Mot de passe", example: "josephine4ever" })
    password: string;
  
    @ApiProperty({ description: "ID de la maison associée", example: "KEVIN" })
    houseId: string;

    house: Prisma.HouseCreateNestedOneWithoutEventsInput;
}