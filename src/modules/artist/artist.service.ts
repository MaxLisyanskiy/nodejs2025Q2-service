import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './artist.model';
import { ArtistDto } from './artist.types';
import { ArtistDB } from './artist.db';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoriteService } from '../favorite/favorite.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistDB: ArtistDB,
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAll(): Artist[] {
    return this.artistDB.findAll();
  }

  getById(id: string, throwError: boolean = true): Artist {
    const artist = this.artistDB.findOne(id);

    if (!artist && throwError) {
      throw new NotFoundException();
    } else if (!artist && !throwError) {
      return;
    }

    return artist;
  }

  create(dto: ArtistDto): Artist {
    const { name, grammy } = dto;

    if (!name || typeof name !== 'string') {
      throw new BadRequestException('Name is invalid!');
    }

    if (!grammy || typeof grammy !== 'boolean') {
      throw new BadRequestException('Grammy is invalid!');
    }

    return this.artistDB.create(dto);
  }

  update(id: string, dto: ArtistDto): Artist {
    const { name, grammy } = dto;
    const artist = this.artistDB.findOne(id);

    if (typeof name !== 'string') {
      throw new BadRequestException('Name is invalid!');
    }

    if (typeof grammy !== 'boolean') {
      throw new BadRequestException('Grammy is invalid!');
    }

    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }

    return this.artistDB.update(id, artist, dto);
  }

  delete(id: string): void {
    if (!this.artistDB.findOne(id)) {
      throw new NotFoundException();
    }

    const album = this.albumService
      .getAll()
      .find(({ artistId }) => artistId === id);
    const track = this.trackService
      .getAll()
      .find(({ artistId }) => artistId === id);

    if (album) this.albumService.update(album.id, { ...album, artistId: null });
    if (track) this.trackService.update(track.id, { ...track, artistId: null });
    this.favoriteService.delete(id, 'artists');

    this.artistDB.delete(id);
  }
}
