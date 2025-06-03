import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumDB } from './album.db';
import { FavoriteModule } from '../favorite/favorite.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [forwardRef(() => FavoriteModule), forwardRef(() => TrackModule)],
  exports: [AlbumService],
  providers: [AlbumService, AlbumDB],
  controllers: [AlbumController],
})
export class AlbumModule {}
