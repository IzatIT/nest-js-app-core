
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    role: string

    @Column({ nullable: true })
    refreshToken: string;
}
