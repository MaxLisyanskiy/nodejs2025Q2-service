import {
  Controller,
  Post,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpCode,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.favoriteService.getAll();
  }

  @Post('/track/:id')
  @UseGuards(JwtAuthGuard)
  addTrackInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.add(id, 'tracks');
  }

  @Post('/album/:id')
  @UseGuards(JwtAuthGuard)
  addAlbumInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.add(id, 'albums');
  }

  @Post('/artist/:id')
  @UseGuards(JwtAuthGuard)
  addArtistInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.add(id, 'artists');
  }

  @Delete('/track/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  deleteTrackInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.delete(id, 'tracks');
  }

  @Delete('/album/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  deleteAlbumInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.delete(id, 'albums');
  }

  @Delete('/artist/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  deleteArtistInFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.delete(id, 'artists');
  }
}
