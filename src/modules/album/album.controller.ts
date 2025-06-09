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
import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getById(id);
  }

  @Post()
  create(@Body() dto: AlbumDto) {
    return this.albumService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AlbumDto) {
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.delete(id);
  }
}
