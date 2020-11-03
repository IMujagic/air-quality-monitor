import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AirQualityDto } from './dtos/air-quality-dto';
import { AirQualityService } from './air-quality.service';

@Controller('air-quality-indexes')
export class AirQualityController {
    constructor(private readonly airQualityService: AirQualityService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getList(@Query() params: any): Promise<AirQualityDto[]> {
        return await this.airQualityService.fetch(Number(params.page));
    }
}
