import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HousesModule } from './houses/houses.module';
import { EventsModule } from './events/events.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { CronModule } from './cron/cron.module';
import { MqttModule } from './mqtt/mqtt.module';
import { UsersModule } from './users/users.module';
@Module({
    imports: [
        CronModule,
        DatabaseModule, 
        HousesModule, 
        EventsModule, 
        EquipmentsModule,
        UsersModule,
        MqttModule, 
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
