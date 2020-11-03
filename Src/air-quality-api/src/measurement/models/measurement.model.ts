import * as mongoose from 'mongoose';

export const MeasurementsSchema = new mongoose.Schema({
  city: { type: String, required: true },
  index: { type: Number, required: true },
  measuredOn: { type: Date, required: true },
});

export interface Measurement extends mongoose.Document {
  city: string;
  index: number;
  measuredOn: Date;
}

export const AirQualityIndexesSchema = new mongoose.Schema({
  country: { type: String, required: true },
  population: { type: Number, required: true },
  measurements: { type: [MeasurementsSchema], required: true },
});

export interface AirQualityIndex extends mongoose.Document {
  country: string;
  population: number;
  measurements: Measurement[]
}