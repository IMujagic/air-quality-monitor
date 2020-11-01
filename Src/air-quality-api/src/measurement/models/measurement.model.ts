import * as mongoose from 'mongoose';

export const MeasurementsSchema = new mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  index: { type: Number, required: true },
  measuredOn: { type: Date, required: true },
});

export interface Measurement extends mongoose.Document {
  country: string;
  city: string;
  index: number;
  measuredOn: Date;
}