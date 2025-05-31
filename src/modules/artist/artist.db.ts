import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Artist } from './artist.model';
import { ArtistDto } from './artist.types';

@Injectable()
export class ArtistDB {
  private artists: Map<string, Artist> = new Map();

  findAll(): Artist[] {
    return Array.from(this.artists.values());
  }

  findOne(id: string): Artist {
    return this.artists.get(id);
  }

  create(dto: ArtistDto): Artist {
    const id = randomUUID();
    const newArtist = {
      id,
      ...dto,
    };

    this.artists.set(id, newArtist);

    return newArtist;
  }

  update(id: string, artist: Artist, options: Partial<Artist>): Artist {
    const updatedartist: Artist = {
      ...artist,
      ...options,
    };

    this.artists.set(id, updatedartist);

    return updatedartist;
  }

  delete(id: string): void {
    this.artists.delete(id);
  }
}
