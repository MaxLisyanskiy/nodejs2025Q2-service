import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.model';
import { ArtistDto } from './artist.types';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistService.getById(id);
  }

  @Post()
  create(@Body() dto: ArtistDto): Artist {
    return this.artistService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ArtistDto,
  ): Artist {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    return this.artistService.delete(id);
  }
}
