import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async getAll() {
    return await this.albumRepository.find();
  }

  async getById(id: string, throwError: boolean = true) {
    const album = await this.albumRepository.findOne({ where: { id } });

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
    await this.albumRepository.delete(id);
  }
}
