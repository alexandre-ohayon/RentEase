import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant, TenantDocument } from './tenant.schema';
import { CreateTenantDto } from '../properties/dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
  ) {}

  create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const tenant = new this.tenantModel(createTenantDto);
    return tenant.save();
  }

  findAll(): Promise<Tenant[]> {
    return this.tenantModel.find().exec();
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantModel.findById(id).exec();
    if (!tenant) throw new NotFoundException(`Tenant #${id} not found`);
    return tenant;
  }

  async update(id: string, dto: CreateTenantDto): Promise<Tenant> {
    const updated = await this.tenantModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Tenant #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.tenantModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Tenant #${id} not found`);
  }
}
