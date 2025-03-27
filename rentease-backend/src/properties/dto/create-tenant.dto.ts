import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
