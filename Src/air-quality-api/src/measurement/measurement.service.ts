import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeasurementDto } from './dtos/measurement-dto';
import { Measurement } from './models/measurement.model';

@Injectable()
export class MeasurementService {
    constructor(@InjectModel('Measurement') private readonly measurementModel: Model<Measurement>) {}

    async fetch(page: number, limit: number): Promise<Measurement[]> {
        return await this.measurementModel.find()
            .skip(page*10)
            .limit(10)
            .exec();
    }

    async seed() {
        for (let index = 1; index < 501; index++) {
            const newM = new this.measurementModel({
                country: 'DE',
                city: 'Munich',
                index: index * 0.76 * 0.23,
                measuredOn: new Date()
            });
    
            await newM.save();
        }
    }
}
