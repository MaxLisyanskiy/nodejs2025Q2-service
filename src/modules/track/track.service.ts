import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from './track.model';
import { TrackDto } from './track.types';
import { TrackDB } from './track.db';
import { FavoriteService } from '../favorite/favorite.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackDB: TrackDB,
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}

  getAll(): Track[] {
    return this.trackDB.findAll();
  }

  getById(id: string, throwError: boolean = true): Track {
    const track = this.trackDB.findOne(id);

    if (!track && throwError) {
      throw new NotFoundException();
    } else if (!track && !throwError) {
      return;
    }

    return track;
  }

  create(dto: TrackDto): Track {
    const { name, duration } = dto;

    if (typeof name !== 'string') {
      throw new BadRequestException('Name is invalid!');
    }

    if (typeof duration !== 'number') {
      throw new BadRequestException('Duration is invalid!');
    }

    const newTrack = this.trackDB.create(dto);
    return newTrack;
  }

  update(id: string, dto: Partial<TrackDto>): Track {
    const { name, duration } = dto;
    const track = this.trackDB.findOne(id);

    if (typeof name !== 'string') {
      throw new BadRequestException('Name is invalid!');
    }

    if (typeof duration !== 'number') {
      throw new BadRequestException('Duration is invalid!');
    }

    if (!track) {
      throw new NotFoundException('Track not found!');
    }

    return this.trackDB.update(id, track, dto);
  }

  delete(id: string): void {
    if (!this.trackDB.findOne(id)) {
      throw new NotFoundException();
    }

    this.favoriteService.delete(id, 'tracks');
    this.trackDB.delete(id);
  }
}
