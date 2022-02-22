import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { DoctorEntity } from './entity/doctor.entity';
import { AddressClientService } from './addressclient.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity]),HttpModule],
  controllers: [DoctorController],
  providers: [DoctorService, AddressClientService],
  exports: [DoctorService],
})
export class DoctorModule { }
