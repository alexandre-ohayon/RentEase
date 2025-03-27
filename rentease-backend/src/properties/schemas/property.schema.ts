import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, type: Number })
  rent: number;

  @Prop({ default: true })
  available: boolean;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
