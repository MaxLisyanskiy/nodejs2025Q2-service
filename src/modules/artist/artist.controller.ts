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
import { ArtistDto } from './artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getById(id);
  }

  @Post()
  create(@Body() dto: ArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ArtistDto) {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.delete(id);
  }
}
