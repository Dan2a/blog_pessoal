import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt // Injetado o arquivo Bcrypt para que possamos usar seu métodos.
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findByUser(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findById(id: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({
            where: { id }
        });

        if (!usuario) {
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        let usuarioBusca = await this.findByUser(usuario.usuario);

        if (!usuarioBusca) {
            // Criptografamos senha antes de criar usuario
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException('O usuário já existe!', HttpStatus.BAD_REQUEST);
    }

    async update(usuario: Usuario): Promise<Usuario> {
        let usuarioUpdate: Usuario = await this.findById(usuario.id)
        let usuarioBusca = await this.findByUser(usuario.usuario)

        if (!usuarioUpdate)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (usuarioBusca && usuarioBusca.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado, digite outro!', HttpStatus.BAD_REQUEST);

        // Antes de atualizar o usuario chamamos a função de Criptografia construída no arquivo bcrypt
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
}