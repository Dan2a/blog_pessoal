import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm/browser";

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

    // Metodo de procurar por ID
    async findById (id: number): Promise<Postagem>{
        const postagem = await this.postagemRepository.findOne({
            where:{
                id
            }
        })

        if(!postagem)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return postagem;
    }

    // Buscar pelo nome do titulo
    async findAllByTitulo(titulo: string): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    // Cadastrar postagem
    async create(postagem: Postagem): Promise<Postagem>{
        return await this.postagemRepository.save(postagem);
    }

    // Atualizar postagem
    async update(postagem: Postagem): Promise<Postagem>{
        await this.findById(postagem.id);
        return await this.postagemRepository.save(postagem);
    }

    // Deletar Postagem
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id);

        return await this.postagemRepository.delete(id);
    }
}