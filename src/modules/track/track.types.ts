import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  artistId: string;

  @IsString()
  albumId: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
