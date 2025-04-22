import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DiagramCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    enabled: boolean;

    @Column()
    titleKg: string;

    @Column()
    titleRu: string;

    @Column({ type: 'enum', enum: ['top', 'bottom'] })
    arrowPosition: 'top' | 'bottom';

    @Column()
    arrowShow: boolean;

    @Column()
    color: string;

    @Column()
    value: string;
}
