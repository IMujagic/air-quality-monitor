import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AirQualityIndex, Measurement } from './models/air-quality.schema';
import { Model } from 'mongoose';
import { AirQualityDto } from './dtos/air-quality-dto';

@Injectable()
export class AirQualityService {
    constructor(@InjectModel('AirQualityIndex') private readonly airQualityIndexModel: Model<AirQualityIndex>) { }

    async fetch(p: number, city: string): Promise<AirQualityDto[]> {
        const limit = 10; //TODO: read from param or config
        const skip = p && p > 0 ? ((p-1) * limit) : 0;
        const selector = city ? { 'measurements.city': city } : {}
        const sort = city ? { 'measurements.measuredOn': -1 } : { 'measurements.index': -1 }
        
        var docs = await this.airQualityIndexModel.aggregate([
            { $unwind: '$measurements' },
            { $match: selector },
            { $sort: sort}
        ])
        .skip(Number(skip))
        .limit(Number(limit));

            
        return docs 
            .map(x => <AirQualityDto> 
            {
                country: x.country,
                population: x.population,
                city: x.measurements.city,
                date: x.measurements.measuredOn.toISOString(),
                index: x.measurements.index
            });
    }
}
