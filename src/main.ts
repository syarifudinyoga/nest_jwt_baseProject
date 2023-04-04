import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Open API Test Yoga')
    .setDescription('API Test Yoga')
    .setVersion('1.0')
    .addTag('Yoga')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  const cors = {
    origin: ['http://localhost:3000', 'http://localhost', '*'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionSuccessStatus: 204,
    credential: true,
    allowedHeaders: ['*'],
  };

  app.enableCors(cors);
  await app.listen(3000);
}
bootstrap();
