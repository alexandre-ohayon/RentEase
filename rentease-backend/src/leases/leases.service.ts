import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lease, LeaseDocument } from './schemas/lease.schema';
import { CreateLeaseDto } from './dto/create-lease.dto';

@Injectable()
export class LeasesService {
  constructor(
    @InjectModel(Lease.name) private leaseModel: Model<LeaseDocument>,
  ) {}

  create(createLeaseDto: CreateLeaseDto): Promise<Lease> {
    const lease = new this.leaseModel(createLeaseDto);
    return lease.save();
  }

  findAll(): Promise<Lease[]> {
    return this.leaseModel
      .find()
      .populate('tenant')
      .populate('property')
      .exec();
  }

  async findOne(id: string): Promise<Lease> {
    const lease = await this.leaseModel
      .findById(id)
      .populate('tenant')
      .populate('property')
      .exec();
    if (!lease) throw new NotFoundException(`Lease #${id} not found`);
    return lease;
  }

  async update(id: string, dto: CreateLeaseDto): Promise<Lease> {
    const updated = await this.leaseModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Lease #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.leaseModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Lease #${id} not found`);
  }
}
