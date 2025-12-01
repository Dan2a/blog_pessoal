import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'tb_postagens' }) // Incicando que a classe é uma Entidade e vai ter o nome "tb_postagens"
export class Postagem {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty() // validador de objeto
    @Column({ length: 100, nullable: false }) //nulllabe => NOT NULL
    titulo: string

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    texto: string

    @UpdateDateColumn()
    data: Date
}