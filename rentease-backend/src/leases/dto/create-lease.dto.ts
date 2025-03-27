import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLeaseDto {
  @IsMongoId()
  tenant: string;

  @IsMongoId()
  property: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  monthlyRent: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
