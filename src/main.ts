import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('PORT:', process.env.PORT);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log('App rodando!');
}
bootstrap();
