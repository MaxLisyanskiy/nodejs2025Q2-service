import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Track } from './track.model';
import { TrackDto } from './track.types';

@Injectable()
export class TrackDB {
  private tracks: Map<string, Track> = new Map();

  findAll(): Track[] {
    return Array.from(this.tracks.values());
  }

  findOne(id: string): Track {
    return this.tracks.get(id);
  }

  create(dto: TrackDto): Track {
    const id = randomUUID();
    const newTrack = {
      id,
      ...dto,
    };

    this.tracks.set(id, newTrack);

    return newTrack;
  }

  update(id: string, track: Track, options: Partial<Track>): Track {
    const updatedTrack: Track = {
      ...track,
      ...options,
    };

    this.tracks.set(id, updatedTrack);

    return updatedTrack;
  }

  delete(id: string): void {
    this.tracks.delete(id);
  }
}
