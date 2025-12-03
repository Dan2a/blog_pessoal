import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./service/postagem.services";
import { PostagemController } from "./controller/postagem.controller";
import { TemasModule } from "../tema/tema.module";
import { TemaService } from "../tema/services/tema.service";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemasModule],
    providers: [PostagemService],
    controllers: [PostagemController],
    exports: [],
})
export class PostagemModule { }