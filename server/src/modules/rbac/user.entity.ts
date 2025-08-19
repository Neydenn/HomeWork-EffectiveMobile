import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Role } from './role.entity.js';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    fullName!: string;

    @Column({ type: 'date' })
    dateOfBirth!: string; 

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 255 })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    passwordHash!: string;

    @Column({ type: 'boolean', default: true })
    isActive!: boolean;

    @ManyToOne(() => Role, (r) => r.users, { eager: true, nullable: false })
    role!: Role;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt!: Date;
}
