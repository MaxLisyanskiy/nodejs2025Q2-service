import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './album.model';
import { AlbumDB } from './album.db';
import { AlbumDto } from './album.types';
import { FavoriteService } from '../favorite/favorite.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumDB: AlbumDB,
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAll(): Album[] {
    return this.albumDB.findAll();
  }

  getById(id: string, throwError: boolean = true): Album {
    const album = this.albumDB.findOne(id);

    if (!album && throwError) {
      throw new NotFoundException();
    } else if (!album && !throwError) {
      return;
    }

    return album;
  }

  create(dto: AlbumDto): Album {
    const { name, year } = dto;

    if (typeof name !== 'string') {
      throw new BadRequestException('Name is invalid!');
    }

    if (typeof year !== 'number') {
      throw new BadRequestException('Year is invalid!');
    }

    const newUser = this.albumDB.create(dto);
    return newUser;
  }

  update(id: string, dto: Partial<AlbumDto>): Album {
    const { name, year } = dto;
    const album = this.albumDB.findOne(id);

    if (typeof name !== 'string') {
      throw new BadRequestException('Name is invalid!');
    }

    if (typeof year !== 'number') {
      throw new BadRequestException('Year is invalid!');
    }

    if (!album) {
      throw new NotFoundException('Album not found!');
    }

    return this.albumDB.update(id, album, dto);
  }

  delete(id: string): void {
    if (!this.albumDB.findOne(id)) {
      throw new NotFoundException();
    }

    const track = this.trackService
      .getAll()
      .find(({ albumId }) => albumId === id);

    if (track) this.trackService.update(track.id, { ...track, albumId: null });
    this.favoriteService.delete(id, 'albums');

    this.albumDB.delete(id);
  }
}
