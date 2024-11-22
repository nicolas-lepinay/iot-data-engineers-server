import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HousesModule } from './houses/houses.module';
import { RoomsModule } from './rooms/rooms.module';
import { EventsModule } from './events/events.module';
import { EquipmentsModule } from './equipments/equipments.module';
@Module({
    imports: [
        DatabaseModule, 
        HousesModule, 
        RoomsModule, 
        EventsModule, 
        EquipmentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
