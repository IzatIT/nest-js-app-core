import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DiagramSpecification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order: number;

    @Column()
    titleRu: string;

    @Column()
    titleKg: string;
}
