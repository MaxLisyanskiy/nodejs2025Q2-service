import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', {
    array: true,
    nullable: false,
    default: () => 'ARRAY[]::uuid[]',
  })
  artists: string[];

  @Column('uuid', {
    array: true,
    nullable: false,
    default: () => 'ARRAY[]::uuid[]',
  })
  albums: string[];

  @Column('uuid', {
    array: true,
    nullable: false,
    default: () => 'ARRAY[]::uuid[]',
  })
  tracks: string[];
}
