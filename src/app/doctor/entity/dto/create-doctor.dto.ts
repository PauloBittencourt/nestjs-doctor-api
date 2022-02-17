import { IsNotEmpty } from "class-validator";

export class CreateDoctorDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    crm: number;

    @IsNotEmpty()
    telfixo: number;

    @IsNotEmpty()
    telcelular: number;

    @IsNotEmpty()
    cep: number;

    @IsNotEmpty()
    especialidade: string;    
}