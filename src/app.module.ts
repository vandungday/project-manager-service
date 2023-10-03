import { Module } from '@nestjs/common';
import configuration from './config/app.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [configuration],
  }),
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return { uri: configService.get<string>('database.uri') };
    },
  }),
    ProjectModule,
  ],
})
export class AppModule { }
