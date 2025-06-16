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
import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: AlbumDto) {
    return this.albumService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AlbumDto) {
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.delete(id);
  }
}
