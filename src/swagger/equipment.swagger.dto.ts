import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EquipmentDto implements Prisma.EquipmentCreateInput {

    @ApiProperty({ description: "ID de l'équipement dans l'ESP32", example: "HUMIDITY_SENSOR" })
    esp32Id: string;

    @ApiProperty({ description: "Nom usuel de l'équipement", example: "Capteur d'humidité" })
    name: string;
  
    @ApiProperty({ description: "ID de la maison associée", example: "KEVIN" })
    houseId: string;
  
    @ApiProperty({ description: "État actuel de l'équipement", example: true })
    state: boolean;
  
    @ApiProperty({ description: "Dernière valeur captée par l'équipement", required: false, example: "95.3" })
    value?: string;
  
    @ApiProperty({ description: "Unité de la valeur captée", required: false, example: "%"  })
    unit?: string;

    house: Prisma.HouseCreateNestedOneWithoutEventsInput;
}