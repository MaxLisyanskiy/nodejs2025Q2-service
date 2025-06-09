import {
  Controller,
  Post,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpCode,
  Get,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  getAll() {
    return this.favoriteService.getAll();
  }

  @Post('/track/:id')
  addTrackInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.add(id, 'tracks');
  }

  @Post('/album/:id')
  addAlbumInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.add(id, 'albums');
  }

  @Post('/artist/:id')
  addArtistInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.add(id, 'artists');
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrackInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.delete(id, 'tracks');
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbumInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.delete(id, 'albums');
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtistInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.delete(id, 'artists');
  }
}
