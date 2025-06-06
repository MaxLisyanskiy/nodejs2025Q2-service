import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
