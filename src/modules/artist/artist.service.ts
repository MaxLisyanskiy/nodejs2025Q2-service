import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async getAll() {
    return await this.artistRepository.find();
  }

  async getById(id: string, throwError: boolean = true) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist && throwError) {
      throw new NotFoundException();
    } else if (!artist && !throwError) {
      return;
    }

    return artist;
  }

  async create(dto: ArtistDto) {
    const newArtist = this.artistRepository.create(dto);
    return await this.artistRepository.save(newArtist);
  }

  async update(id: string, dto: ArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }

    const updated = await this.artistRepository.save({
      ...artist,
      ...dto,
    });

    return updated;
  }

  async delete(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException();
    }

    // const album = this.albumService
    //   .getAll()
    //   .find(({ artistId }) => artistId === id);
    // const track = this.trackService
    //   .getAll()
    //   .find(({ artistId }) => artistId === id);

    // if (album) this.albumService.update(album.id, { ...album, artistId: null });
    // if (track) this.trackService.update(track.id, { ...track, artistId: null });
    // this.favoriteService.delete(id, 'artists');

    await this.artistRepository.delete(id);
  }
}
