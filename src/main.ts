import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const { data: response } = await axios.get("http://localhost:3001/api/v1/users");
  // console.log("🚀 ~ file: main.ts:13 ~ bootstrap ~ data:", response)
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



  const config = new DocumentBuilder()
    .setTitle('Project Management Service')
    .setDescription('project management service API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}
bootstrap();
