import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { FavoriteModule } from '../favorite/favorite.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist]),
    forwardRef(() => FavoriteModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  exports: [ArtistService],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
