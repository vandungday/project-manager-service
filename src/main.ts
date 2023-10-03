import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * Global Pipes
   */
  const validationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  app.useGlobalPipes(validationPipe);

  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}
bootstrap();
