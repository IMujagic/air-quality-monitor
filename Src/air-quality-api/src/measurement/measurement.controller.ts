import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MeasurementDto } from './measurement-dto';
import { MeasurementService } from './measurement.service';

@Controller('measurements')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getList(page: number, limit: number): MeasurementDto[] {
        return this.measurementService.fetch(page, limit);
    }
}
