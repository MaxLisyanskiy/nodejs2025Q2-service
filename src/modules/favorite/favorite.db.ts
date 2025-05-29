import { Injectable } from '@nestjs/common';
import { Favorites } from './favorite.model';

@Injectable()
export class FavoriteDB {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll(): Favorites {
    return this.favorites;
  }

  add(id: string, type: keyof Favorites): void {
    this.favorites[type].push(id);
  }

  delete(id: string, type: keyof Favorites): void {
    this.favorites[type] = this.favorites[type].filter(
      (itemId) => itemId !== id,
    );
  }
}
