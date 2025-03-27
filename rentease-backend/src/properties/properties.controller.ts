import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './schemas/property.schema';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() dto: CreatePropertyDto): Promise<Property> {
    return this.propertiesService.create(dto);
  }

  @Get()
  findAll(): Promise<Property[]> {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Property> {
    return this.propertiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreatePropertyDto,
  ): Promise<Property> {
    return this.propertiesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.propertiesService.remove(id);
  }
}
