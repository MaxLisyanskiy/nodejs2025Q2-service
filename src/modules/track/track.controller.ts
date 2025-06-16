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
import { TrackService } from './track.service';
import { TrackDto } from './track.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: TrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: TrackDto) {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.delete(id);
  }
}
