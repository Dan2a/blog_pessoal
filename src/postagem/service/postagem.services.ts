import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable() // Indica que a classe é de serviço e pode ser injetada em outras classes.
export class PostagemService {
    constructor(
        @InjectRepository(Postagem) // Pode chamar os metodos de uma classe Repository 'INVERSÃO DE DEPENDENCIA'
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ) { }

    // Função espera "await" até que tenha um retorno.
    async findAll(): Promise<Postagem[]> { // Promise => promessa Toda função assincrona retorna uma promessa que deu certou ou errado.
        return await this.postagemRepository.find({
            relations: {
                tema: true,
                usuario: true
            }
        });
    }

    // Metodo de procurar por ID
    async findById(id: number): Promise<Postagem> {
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true,
                usuario: true
            }
        })

        if (!postagem)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return postagem;
    }

    // Buscar pelo nome do titulo
    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                tema: true,
                usuario: true
            }
        })
    }

    // Cadastrar postagem
    async create(postagem: Postagem): Promise<Postagem> {
        if (postagem.tema) {
            let tema = await this.temaService.findById(postagem.tema.id)
            if (!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            return await this.postagemRepository.save(postagem);
        }
        return await this.postagemRepository.save(postagem);
    }

    // Atualizar postagem
    async update(postagem: Postagem): Promise<Postagem> {
        let buscaPostagem: Postagem = await this.findById(postagem.id);
        if (!buscaPostagem) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }
        if (postagem.tema) {
            let tema = await this.temaService.findById(postagem.tema.id)
            if (!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            return await this.postagemRepository.save(postagem);
        }
        return await this.postagemRepository.save(postagem);
    }

    // Deletar Postagem
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.postagemRepository.delete(id);
    }
}