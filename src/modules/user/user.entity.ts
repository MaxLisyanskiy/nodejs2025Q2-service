import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column({ nullable: true })
  password?: string;

  @VersionColumn({ default: 1 })
  version: number; // integer number, increments on update

  @CreateDateColumn()
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn()
  updatedAt: Date; // timestamp of last update
}
