import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';
import { MeasurementsSchema } from './models/measurement.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Measurement', schema: MeasurementsSchema }])],
  controllers: [MeasurementController],
  providers: [MeasurementService]
})
export class MeasurementModule {}
