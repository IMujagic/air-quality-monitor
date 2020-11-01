import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasurementModule } from './measurement/measurement.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MeasurementModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
