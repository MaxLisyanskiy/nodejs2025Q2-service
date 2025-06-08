import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesResponse } from './favorite.types';
import { Favorite } from './favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAllFavsIds() {
    const [favorites] = await this.favoriteRepository.find();

    if (!favorites) {
      return this.favoriteRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
    }

    return favorites;
  }

  async getAll() {
    const favorites = await this.getAllFavsIds();

    const { artists = [], albums = [], tracks = [] } = favorites;

    const artistsList = await this.artistRepository.find({
      where: { id: In(artists) },
    });
    const albumsList = await this.albumRepository.find({
      where: { id: In(albums) },
    });
    const tracksList = await this.trackRepository.find({
      where: { id: In(tracks) },
    });

    return {
      artists: artistsList,
      albums: albumsList,
      tracks: tracksList,
    };
  }

  private async validateAndGetEntity(
    id: string,
    type: keyof FavoritesResponse,
  ) {
    const serviceMap = {
      artists: this.artistRepository,
      albums: this.albumRepository,
      tracks: this.trackRepository,
    };

    const service = serviceMap[type];
    const entity = await service.findOne({ where: { id } });

    if (!entity) {
      throw new UnprocessableEntityException(
        `Entity not found for type ${type} with id ${id}`,
      );
    }

    return entity;
  }

  async add(id: string, type: keyof FavoritesResponse) {
    await this.validateAndGetEntity(id, type);

    const favorites = await this.getAllFavsIds();
    favorites[type].push(id);
    await this.favoriteRepository.save(favorites);
  }

  async delete(id: string, type: keyof FavoritesResponse) {
    await this.validateAndGetEntity(id, type);

    const favorites = await this.getAllFavsIds();
    favorites[type] = favorites[type].filter((itemId) => itemId !== id);
    await this.favoriteRepository.save(favorites);
  }
}
