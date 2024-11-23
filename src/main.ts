import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors();
    
    // Swagger Doc
    const config = new DocumentBuilder()
        .setTitle('IOT API')
        .setDescription("API pour l'application IOT - Maisons Connectées")
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document); // https://<api-domain-name>/doc

    // Configuration du microservice MQTT
    const mqttMicroservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.MQTT,
        options: {
          url: `mqtts://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
          username: process.env.MQTT_USERNAME,
          password: process.env.MQTT_PASSWORD,
        },
      });
      

    await app.startAllMicroservices();
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
