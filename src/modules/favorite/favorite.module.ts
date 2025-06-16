import { forwardRef, Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, Artist, Album, Track]),
    forwardRef(() => AuthModule),
  ],
  exports: [FavoriteService],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
