import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsString()
  @IsOptional()
  artistId?: string;
}
