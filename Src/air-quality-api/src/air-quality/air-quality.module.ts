import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { AirQualityIndexesSchema, MeasurementsSchema } from './models/air-quality.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'AirQualityIndex', schema: AirQualityIndexesSchema }])],
  controllers: [AirQualityController],
  providers: [AirQualityService]
})
export class AirQualityModule {}
