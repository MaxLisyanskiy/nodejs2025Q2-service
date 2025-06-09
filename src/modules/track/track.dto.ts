import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  artistId?: string;

  @IsString()
  @IsOptional()
  albumId?: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
