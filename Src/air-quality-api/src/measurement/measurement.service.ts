import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement } from './models/measurement.model';
import { Model } from 'mongoose';
import { MeasurementDto } from './dtos/measurement-dto';

@Injectable()
export class MeasurementService {
    constructor(@InjectModel('Measurement') private readonly measurementModel: Model<Measurement>) { }

    async fetch(p: string): Promise<MeasurementDto[]> {
        const l = 30; //TODO: read from param or config
        const options = { skip: parseInt(p)*30, limit: l}

        var docs = await this.measurementModel.find({}, {},  options, function(err, results) { }).exec();
        
        return docs
            .map(x => <MeasurementDto> 
            {
                country: x.country,
                city: x.city,
                date: x.measuredOn.toISOString(),
                index: x.index
            })
    }
}
