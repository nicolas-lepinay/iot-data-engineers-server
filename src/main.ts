import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
