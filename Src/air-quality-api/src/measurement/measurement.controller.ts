import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MeasurementDto } from './dtos/measurement-dto';
import { MeasurementService } from './measurement.service';
import { Measurement } from './models/measurement.model';

@Controller('measurements')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getList(@Query() page: number, @Query() limit: number): Promise<Measurement[]> {
        return await this.measurementService.fetch(page, limit);
    }

    @Get('seed')
    seed() {
        this.measurementService.seed();
    }
}
