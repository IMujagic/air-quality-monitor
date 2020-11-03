import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AirQualityIndex, Measurement } from './models/measurement.model';
import { Model } from 'mongoose';
import { MeasurementDto } from './dtos/measurement-dto';

@Injectable()
export class MeasurementService {
    constructor(@InjectModel('AirQualityIndex') private readonly airQualityIndexModel: Model<AirQualityIndex>) { }

    async fetch(p: string): Promise<MeasurementDto[]> {
        const l = 5; //TODO: read from param or config
        const options = { skip: parseInt(p)*30, limit: l}

        var docs = await this.airQualityIndexModel.find({}, {  },  options, function(err, results) {  })
            
        
        return docs 
            .map(x => <MeasurementDto> 
            {
                country: x.country,
                population: x.population,
                city: x.measurements[0].city,
                date: x.measurements[0].measuredOn.toISOString(),
                index: x.measurements[0].index
            });
    }

    async seed() {
        await this.seed_by_country('de', 'Munich', 80000000);
        await this.seed_by_country('ba', 'Sarajevo', 3000000);
        await this.seed_by_country('hr', 'Zagreb', 4000000);
        await this.seed_by_country('at', 'Vienna', 6000000);
        await this.seed_by_country('ch', 'Zurich', 1100000);
        await this.seed_by_country('fr', 'Paris', 90000000);
        await this.seed_by_country('nl', 'Amsterdam', 30000000);
        await this.seed_by_country('gb', 'London', 200000000);
        await this.seed_by_country('se', 'Stockholm', 900000000);
        await this.seed_by_country('be', 'Brusseles', 4234234234);
        await this.seed_by_country('it', 'Rome', 4234234234);
        await this.seed_by_country('es', 'Madrid', 23423423);
        await this.seed_by_country('ro', 'Bucurest', 234234234234);
        await this.seed_by_country('us', 'Washington', 33243423434);
        await this.seed_by_country('br', 'Sao Paolo', 23432424233);
    }

    async seed_by_country(country, city, population: number) {
        var measuremetns: Measurement[] = [];

        for (let index = 1; index < 25; index++) {
            measuremetns.push(<Measurement>{
                city: city,
                index: index * this.getRandomInt(20),
                measuredOn: new Date()
            });
        }

        const newM = new this.airQualityIndexModel({
            country: country,
            population: population,
            measurements: measuremetns
        });

        await newM.save();
    }

    private getRandomInt(max): number {
        return Math.floor(Math.random() * Math.floor(max));
      }

}
