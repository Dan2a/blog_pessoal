import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() // Indica que a classe é de serviço e pode ser injetada em outras classes.
export class PostagemService {

    constructor(
        @InjectRepository(Postagem) // Pode chamar os metodos de uma classe Repository 'INVERSÃO DE DEPENDENCIA'
        private postagemRepository: Repository<Postagem>
    ) { }

    // Função espera "await" até que tenha um retorno.
    async findAll (): Promise<Postagem[]>{ // Promise => promessa Toda função assincrona retorna uma promessa que deu certou ou errado.
        return  await this.postagemRepository.find();
    } 
}