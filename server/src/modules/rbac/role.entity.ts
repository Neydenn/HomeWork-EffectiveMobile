import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Permission } from './permission.entity.js';
import { User } from './user.entity.js';
import { RoleName } from '../../types/role.enum.js';


@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', unique: true })
    name!: RoleName;

    @ManyToMany(() => Permission, (perm) => perm.roles, { eager: true })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: { name: 'roleId', referencedColumnName: 'id' },            // <— ВАЖНО
        inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' } // <— ВАЖНО
    })
    permissions!: Permission[];

    @OneToMany(() => User, (u) => u.role)
    users!: User[];
}
