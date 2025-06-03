import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteDB } from './favorite.db';
import { FavoritesResponse } from './favorite.types';
import { Favorites } from './favorite.model';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteDB: FavoriteDB,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAll(): FavoritesResponse {
    const favs = this.favoriteDB.findAll();
    const artists = this.artistService
      .getAll()
      .filter(({ id }) => favs.artists.includes(id));
    const albums = this.albumService
      .getAll()
      .filter(({ id }) => favs.albums.includes(id));
    const tracks = this.trackService
      .getAll()
      .filter(({ id }) => favs.tracks.includes(id));

    return {
      artists,
      albums,
      tracks,
    };
  }

  private validateAndGetEntity(id: string, type: keyof Favorites): unknown {
    const serviceMap = {
      artists: this.artistService,
      albums: this.albumService,
      tracks: this.trackService,
    };

    const service = serviceMap[type];
    const entity = service.getById(id, false);
    if (!entity) {
      throw new UnprocessableEntityException(
        `Entity not found for type ${type} with id ${id}`,
      );
    }
    return entity;
  }

  add(id: string, type: keyof Favorites): void {
    this.validateAndGetEntity(id, type);
    this.favoriteDB.add(id, type);
  }

  delete(id: string, type: keyof Favorites): void {
    this.validateAndGetEntity(id, type);
    this.favoriteDB.delete(id, type);
  }
}
