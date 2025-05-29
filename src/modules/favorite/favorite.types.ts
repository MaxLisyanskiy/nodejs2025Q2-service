import { Album } from '../album/album.model';
import { Artist } from '../artist/artist.model';
import { Track } from '../track/track.model';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
