import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Album } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => AuthModule)],
  exports: [AlbumService],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
