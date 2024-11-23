import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HousesModule } from './houses/houses.module';
import { RoomsModule } from './rooms/rooms.module';
import { EventsModule } from './events/events.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';
import { MqttModule } from './mqtt/mqtt.module';
@Module({
    imports: [
        CronModule,
        DatabaseModule, 
        HousesModule, 
        RoomsModule, 
        EventsModule, 
        EquipmentsModule, 
        MqttModule, 
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
