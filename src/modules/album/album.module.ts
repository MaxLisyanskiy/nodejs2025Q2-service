import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FavoriteModule } from '../favorite/favorite.module';
import { TrackModule } from '../track/track.module';
import { Album } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => FavoriteModule),
    forwardRef(() => TrackModule),
  ],
  exports: [AlbumService],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
