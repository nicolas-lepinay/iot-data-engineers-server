import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EventDto implements Prisma.EventCreateInput {

    @ApiProperty({ description: "ID de l'équipement dans l'ESP32", example: "TEMP_SENSOR" })
    equipmentEsp32Id: string;
  
    @ApiProperty({ description: "ID de la maison", example: "EVE" })
    houseId: string;
  
    @ApiProperty({ description: "État de l'équipement", example: true })
    state: boolean;
  
    @ApiProperty({ description: "Valeur captée par l'équipement", required: false, example: "22.3" })
    value?: string;
  
    @ApiProperty({ description: "Unité de la valeur captée", required: false, example: "°C"  })
    unit?: string;

    house: Prisma.HouseCreateNestedOneWithoutEventsInput;
    
    equipment: Prisma.EquipmentCreateNestedOneWithoutEventsInput;
}