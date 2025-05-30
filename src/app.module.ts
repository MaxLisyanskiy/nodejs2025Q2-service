import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoriteModule } from './modules/favorite/favorite.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule, FavoriteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
