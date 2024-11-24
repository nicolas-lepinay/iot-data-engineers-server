import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { EquipmentsModule } from '../equipments/equipments.module'; // Importation du module Equipments
import { EventsModule } from '../events/events.module'; // Importation du module Equipments

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
            url: `mqtts://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD,
        },
      },
    ]),
    EquipmentsModule,
    EventsModule,
  ],
  controllers: [MqttController],
  providers: [MqttService],
})

export class MqttModule {}
