import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(
    { 
      origin: process.env.ALLOW_ORIGIN,
      methods: ['get', 'post'] 
    }
  )
  
  await app.listen(3000);
}
bootstrap();
