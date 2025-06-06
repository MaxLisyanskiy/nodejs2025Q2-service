import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
