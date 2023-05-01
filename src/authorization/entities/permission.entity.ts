import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Authorization } from './authorization.entity';
import { BaseEntity } from 'src/base-entity';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //relations
  @OneToMany(() => Authorization, (authorization) => authorization.permission)
  authorizations: Authorization[];
}
