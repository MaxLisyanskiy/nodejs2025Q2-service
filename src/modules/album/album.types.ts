import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsString()
  artistId: string;
}
