import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { DiagramField } from './diagram-field.entity';
import { DiagramSpecification } from './diagram-specification.entity';
import { DiagramCard } from './diagram-card.entity';

@Entity()
export class Diagram {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titleRu: string;

    @Column()
    titleKg: string;

    @Column()
    order: number;

    @Column()
    descriptionKg: string;

    @Column()
    descriptionRu: string;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column({ nullable: true })
    type?: string;

    @OneToMany(() => DiagramField, (field) => field.diagram, { cascade: true })
    diagramFields: DiagramField[];

    @OneToOne(() => DiagramSpecification, { cascade: true })
    @JoinColumn()
    diagramSpecification: DiagramSpecification;

    @OneToOne(() => DiagramCard, { cascade: true })
    @JoinColumn()
    card: DiagramCard;
}
