import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity.js';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', unique: true })
    name!: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles!: Role[];
}

