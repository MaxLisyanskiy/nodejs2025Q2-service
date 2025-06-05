import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn({ default: 1 })
  version: number; // integer number, increments on update

  @Column({
    type: 'bigint',
    transformer: {
      to: (time: number) => time,
      from: (time: string) => Number(time),
    },
  })
  createdAt: number; // timestamp of creation

  @Column({
    type: 'bigint',
    transformer: {
      to: (time: number) => time,
      from: (time: string) => Number(time),
    },
  })
  updatedAt: number; // timestamp of last update
}
