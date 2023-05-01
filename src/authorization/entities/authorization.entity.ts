import { BaseEntity } from 'src/base-entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'authorizations' })
export class Authorization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  create: boolean;

  @Column({ default: false })
  read: boolean;

  @Column({ default: false })
  update: boolean;

  @Column({ default: false })
  delete: boolean;

  @Column({ default: false })
  manage: boolean;

  //relations
  @ManyToOne(() => Role, (role) => role.authorizations)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.authorizations)
  permission: Permission;
}
