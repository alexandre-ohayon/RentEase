import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = new this.propertyModel(createPropertyDto);
    return property.save();
  }

  findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    return property;
  }

  async update(id: string, dto: CreatePropertyDto): Promise<Property> {
    const updated = await this.propertyModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Property #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.propertyModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Property #${id} not found`);
  }
}
