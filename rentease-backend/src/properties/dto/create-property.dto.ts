import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  address: string;

  @IsNumber()
  rent: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
