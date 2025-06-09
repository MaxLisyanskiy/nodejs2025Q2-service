import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
