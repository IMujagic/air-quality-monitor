import { Controller, Get } from '@nestjs/common';
import { MeasurementDto } from './measurement-dto';
import { MeasurementService } from './measurement.service';

@Controller('measurements')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}

    @Get()
    getList(page: number, limit: number): MeasurementDto[] {
        return this.measurementService.fetch(page, limit);
    }
}
