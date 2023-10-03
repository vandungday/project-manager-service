import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Environment, EnvironmentSchema } from '@/common/schemas';
import { EnvironmentRepository } from '@/common/repository/environment.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Environment.name, schema: EnvironmentSchema }])],
  controllers: [EnvironmentController],
  providers: [EnvironmentService, EnvironmentRepository],
})
export class EnvironmentModule { }
