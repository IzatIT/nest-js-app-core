import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DiagramField } from './diagram-field.entity';

@Entity()
export class DiagramFieldValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'float' })
  value: number | null;

  @Column()
  titleKg: string;

  @Column()
  titleRu: string;

  @Column()
  titleEn: string;

  @ManyToOne(() => DiagramField, (field) => field.values, { onDelete: 'CASCADE' })
  diagramField: DiagramField;
}
