import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesResponse } from './favorite.types';
import { Favorite } from './favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getAll() {
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

    const favorites = await this.getAll();
    favorites[type].push(id);
    console.log(favorites);
    await this.favoriteRepository.save(favorites);
  }

  async delete(id: string, type: keyof FavoritesResponse) {
    await this.validateAndGetEntity(id, type);

    const favorites = await this.getAll();
    favorites[type] = favorites[type].filter((itemId) => itemId !== id);
    await this.favoriteRepository.save(favorites);
  }
}
