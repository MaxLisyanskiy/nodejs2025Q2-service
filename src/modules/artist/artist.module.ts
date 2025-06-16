import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), forwardRef(() => AuthModule)],
  exports: [ArtistService],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
