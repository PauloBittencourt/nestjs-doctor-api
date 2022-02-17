import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from './entity/doctor.entity';
import { CreateDoctorDto } from './entity/dto/create-doctor.dto';
import { UpdateDoctorDto } from './entity/dto/update-doctor.dto';

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(DoctorEntity)
        private readonly doctorRepository: Repository<DoctorEntity>
    ) { }

    async findAll() {
        return await this.doctorRepository.find();
    }
    
    async findOne(id: string) {
        try {
            return await this.doctorRepository.findOneOrFail(id);
        } catch (error) {
        throw new NotFoundException(error.message);
        }
    }

    async create(data: CreateDoctorDto) {
        
        return await this.doctorRepository.save(this.doctorRepository.create(data));
    }

    async update(id:string, data:UpdateDoctorDto) {
        const doctor = await this.doctorRepository.findOneOrFail(id);

        this.doctorRepository.merge(doctor,data);
        return await this.doctorRepository.save(doctor)
    }

    async deleteById(id: string) {
        await this.doctorRepository.findOneOrFail(id);
        await this.doctorRepository.softDelete(id);
    }
}
