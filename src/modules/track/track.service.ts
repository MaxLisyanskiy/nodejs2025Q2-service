import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDto } from './track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string, throwError: boolean = true) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track && throwError) {
      throw new NotFoundException();
    } else if (!track && !throwError) {
      return;
    }

    return track;
  }

  async create(dto: TrackDto) {
    const newTrack = this.trackRepository.create(dto);
    return await this.trackRepository.save(newTrack);
  }

  async update(id: string, dto: Partial<TrackDto>) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found!');
    }

    const updated = await this.trackRepository.save({
      ...track,
      ...dto,
    });

    return updated;
  }

  async delete(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException();
    }

    await this.trackRepository.delete(id);
  }
}
