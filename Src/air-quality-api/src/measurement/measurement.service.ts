import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement } from './models/measurement.model';
import { Model } from 'mongoose';

@Injectable()
export class MeasurementService {
    constructor(@InjectModel('Measurement') private readonly measurementModel: Model<Measurement>) { }

    async fetch(p: string): Promise<Measurement[]> {
        const l = 30; //TODO: read from param or config
        const options = { skip: parseInt(p)*30, limit: l}
        return this.measurementModel.find({}, {},  options, function(err, results) { });
    }

    async seed() {
        await this.seed_by_country('de', 'Munich');
        await this.seed_by_country('ba', 'Sarajevo');
        await this.seed_by_country('hr', 'Zagreb');
        await this.seed_by_country('at', 'Vienna');
        await this.seed_by_country('ch', 'Zurich');
        await this.seed_by_country('fr', 'Paris');
        await this.seed_by_country('nl', 'Amsterdam');
        await this.seed_by_country('gb', 'London');
        await this.seed_by_country('se', 'Stockholm');
        await this.seed_by_country('be', 'Brusseles');
        await this.seed_by_country('it', 'Rome');
        await this.seed_by_country('es', 'Madrid');
        await this.seed_by_country('ro', 'Bucurest');
        await this.seed_by_country('us', 'Washington');
        await this.seed_by_country('br', 'Sao Paolo');
    }

    async seed_by_country(country, city) {
        for (let index = 1; index < 25; index++) {
            const newM = new this.measurementModel({
                country: country,
                city: city,
                index: index * 0.76 * 0.23,
                measuredOn: new Date()
            });

            await newM.save();
        }
    }
}
