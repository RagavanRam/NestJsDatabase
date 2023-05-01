import { Role } from 'src/authorization/entities';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetKey: string;

  // relations
  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'SET NULL' })
  role: Role;
}
