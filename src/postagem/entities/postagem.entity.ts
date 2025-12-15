import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' }) // Incicando que a classe é uma Entidade e vai ter o nome "tb_postagens"
export class Postagem {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty() // validador de objeto
    @Column({ length: 100, nullable: false }) //nulllabe => NOT NULL
    @ApiProperty()
    titulo: string

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    @ApiProperty()
    texto: string

    @UpdateDateColumn()
    @ApiProperty()
    data: Date

    @ApiProperty({ type: () => Tema })
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
}