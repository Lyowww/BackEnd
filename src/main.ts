import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

(async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const PORT = config.get<string>('PORT');
  const CLIENT_URL = config.get<string>('CLIENT_URL');

  const configSwagger = new DocumentBuilder()
    .setTitle('BeBridge')
    .setDescription('Description')
    .setVersion('1.0')
    .addTag('.')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    credentials: true,
    origin: CLIENT_URL
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
})();
