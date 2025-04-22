import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Diagram } from './diagram.entity';
import { DiagramFieldValue } from './field-value.entity';
import { Reference } from 'src/reference/entities/reference.entity';

@Entity()
export class DiagramField {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titleKg: string;

    @Column()
    titleRu: string;

    @Column({ type: 'float' })
    fieldValue: number;

    @Column()
    order: number;

    @Column()
    code: string;

    @ManyToOne(() => Reference, { nullable: true })
    region?: Reference;

    @OneToMany(() => DiagramFieldValue, (value) => value.diagramField, { cascade: true })
    values: DiagramFieldValue[];

    @ManyToOne(() => Diagram, (diagram) => diagram.diagramFields, { onDelete: 'CASCADE' })
    diagram: Diagram;
}
