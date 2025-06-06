import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoriteModule } from '../favorite/favorite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => FavoriteModule),
  ],
  exports: [TrackService],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
