import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @Column({ type: 'boolean', default: true, nullable: true })
  status: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  createdBy?: string;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  updatedBy?: string;
}
