import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackDB } from './track.db';
import { FavoriteModule } from '../favorite/favorite.module';

@Module({
  imports: [forwardRef(() => FavoriteModule)],
  exports: [TrackService],
  providers: [TrackService, TrackDB],
  controllers: [TrackController],
})
export class TrackModule {}
