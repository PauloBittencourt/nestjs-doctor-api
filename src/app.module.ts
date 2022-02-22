import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './app/doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', '127.0.0.1'),
        port: Number(configService.get('DB_PORT', '5432')),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres123'),
        database: configService.get('DB_DATABASE', 'doctor_db'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      })
    }),
    DoctorModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
