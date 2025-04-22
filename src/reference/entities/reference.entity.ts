import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Reference {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    titleRu: string;

    @Column()
    @ApiProperty()
    titleKg: string;

    @Column()
    @ApiProperty()
    titleEn: string;
}
