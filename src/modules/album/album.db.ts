import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Album } from './album.model';
import { AlbumDto } from './album.types';

@Injectable()
export class AlbumDB {
  private albums: Map<string, Album> = new Map();

  findAll(): Album[] {
    return Array.from(this.albums.values());
  }

  findOne(id: string): Album {
    return this.albums.get(id);
  }

  create(dto: AlbumDto): Album {
    const id = randomUUID();
    const newTrack = {
      id,
      ...dto,
    };

    this.albums.set(id, newTrack);

    return newTrack;
  }

  update(id: string, track: Album, options: Partial<Album>): Album {
    const updatedTrack: Album = {
      ...track,
      ...options,
    };

    this.albums.set(id, updatedTrack);

    return updatedTrack;
  }

  delete(id: string): void {
    this.albums.delete(id);
  }
}
