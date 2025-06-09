import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Artist, Album, Track])],
  exports: [FavoriteService],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
