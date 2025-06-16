import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), forwardRef(() => AuthModule)],
  exports: [TrackService],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
