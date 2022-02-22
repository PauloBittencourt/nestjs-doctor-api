import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Res, Put, HttpStatus } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './entity/dto/create-doctor.dto';
import { UpdateDoctorDto } from './entity/dto/update-doctor.dto';
import { AddressClientService } from './addressclient.service';
import { Response } from 'express';

@Controller('api/v1/doctors')
export class DoctorController {
    constructor(
        private readonly doctorService: DoctorService,
        private readonly addressClientService: AddressClientService
    ) { }

    @Get()
    async index() {
        return await this.doctorService.findAll();
    }

    @Post()
    async create(@Res() response: Response, @Body() body: CreateDoctorDto) {
        const resp = await this.doctorService.create(body);
        const cep = await this.addressClientService.getCep(resp.cep);
        Object.assign(resp, { endereco: cep });
        response.status(HttpStatus.OK).json(resp);
    }

    @Get(':id')
    async show(@Res() response: Response, @Param('id', new ParseUUIDPipe()) id: string) {
        const resp = await this.doctorService.findOne(id);
        const cep = await this.addressClientService.getCep(resp.cep);
        Object.assign(resp, { endereco: cep });
        response.status(HttpStatus.OK).json(resp);
    }

    @Put(':id')
    async update(@Res() response: Response, @Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateDoctorDto) {
        const resp = await this.doctorService.update(id, body);
        const cep = await this.addressClientService.getCep(resp.cep);
        Object.assign(resp, { endereco: cep });
        response.status(HttpStatus.OK).json(resp);}

    @Delete(':id')
    @HttpCode(204)
    async destroy(@Res() response: Response, @Param('id', new ParseUUIDPipe()) id: string) {
        await this.doctorService.deleteById(id);
        response.status(HttpStatus.OK).json();
    }
}
