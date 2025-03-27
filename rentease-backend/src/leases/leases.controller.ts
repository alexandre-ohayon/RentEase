import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { Lease } from './schemas/lease.schema';

@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Post()
  create(@Body() dto: CreateLeaseDto): Promise<Lease> {
    return this.leasesService.create(dto);
  }

  @Get()
  findAll(): Promise<Lease[]> {
    return this.leasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lease> {
    return this.leasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateLeaseDto): Promise<Lease> {
    return this.leasesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.leasesService.remove(id);
  }
}
