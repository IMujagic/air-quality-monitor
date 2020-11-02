import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MeasurementService } from './measurement.service';
import { Measurement } from './models/measurement.model';

@Controller('measurements')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getList(@Query() page: string): Promise<Measurement[]> {
        return await this.measurementService.fetch(page);
    }

    @Get('seed')
    seed() {
        this.measurementService.seed();
    }
}
