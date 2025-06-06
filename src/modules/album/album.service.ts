import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumDto } from './album.dto';
import { FavoriteService } from '../favorite/favorite.service';
import { TrackService } from '../track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async getAll() {
    return await this.albumRepository.find();
  }

  async getById(id: string, throwError: boolean = true) {
    const album = await this.albumRepository.findOne({ where: { id } });

    console.log(album, !album && throwError);

    if (!album && throwError) {
      throw new NotFoundException();
    } else if (!album && !throwError) {
      return;
    }

    return album;
  }

  async create(dto: AlbumDto) {
    const newAlbum = this.albumRepository.create(dto);
    return await this.albumRepository.save(newAlbum);
  }

  async update(id: string, dto: Partial<AlbumDto>) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found!');
    }

    const updated = await this.albumRepository.save({
      ...album,
      ...dto,
    });

    return updated;
  }

  async delete(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException();
    }

    // const track = this.trackService
    //   .getAll()
    //   .find(({ albumId }) => albumId === id);

    // if (track) this.trackService.update(track.id, { ...track, albumId: null });
    // this.favoriteService.delete(id, 'albums');

    await this.albumRepository.delete(id);
  }
}
