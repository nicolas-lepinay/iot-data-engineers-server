import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MqttService {
  constructor(
    @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
  ) {}

  async publishMessage(topic: string, message: any) {
    this.client.emit(topic, message);
  }
}

