import { BaseEntity } from 'src/base-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Authorization } from './authorization.entity';
import { User } from 'src/users/entities';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //relations
  @OneToMany(() => Authorization, (authorization) => authorization.role)
  authorizations: Authorization[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
