import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './entity/dto/create-doctor.dto';

@Controller('api/v1/doctors')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) { }


    @Get()
    async index() {
        return await this.doctorService.findAll();
    }

    @Post()
    async create(@Body() body: CreateDoctorDto) {
        return await this.doctorService.create(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.doctorService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
        return await this.doctorService.update(id,body);
    }

    @Delete(':id')
    @HttpCode(204)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.doctorService.deleteById(id);
    }
}
