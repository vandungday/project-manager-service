import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Global Pipes
   */
  const validationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    stopAtFirstError: true,
  });
  app.useGlobalPipes(validationPipe);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}
bootstrap();
