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
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './artist.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: ArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ArtistDto) {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.delete(id);
  }
}
