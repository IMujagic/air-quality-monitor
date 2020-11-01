import { Injectable } from '@nestjs/common';
import { MeasurementDto } from './measurement-dto';

@Injectable()
export class MeasurementService {

    fetch(page: number, limit: number): MeasurementDto[] {
        var e: MeasurementDto[] = [];

        for (let i = 0; i < 100; i++) {
            let a: MeasurementDto = { country: 'DE', city: 'Munich', index: i, date: new Date().toISOString()};
            e.push(a);
        }

        return e.slice((page*limit)-limit, page*limit);
    }
}
