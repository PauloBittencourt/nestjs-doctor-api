import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AddressClientService {
    constructor(
        private readonly httpService: HttpService
    ) { }

    async getCep(cep: number) {
        const { status, data } = await this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`).toPromise();
        if (status === 200 && !data.erro) {
            return data;
        }

        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: `Cep ${cep} can't be found`,
          }, HttpStatus.FORBIDDEN);
  /*      const notFoundError = new Error('NotFoundError');
        Object.assign(notFoundError, { details: `Cep ${cep} can't be found` });
        throw notFoundError; */
    } 
}
