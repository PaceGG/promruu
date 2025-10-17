import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CarModule, UserModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
