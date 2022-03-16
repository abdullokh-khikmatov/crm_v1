import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './teachers/teachers.module';
import { GroupModule } from './groups/group.module';
import { ChildrenModule } from './children/children.module';
import { OrdersModule } from './orders/orders.module';
import { HomeModule } from './home/home.module';
import { SeasonModule } from './seasons/seasons.module';
import { PaymentModule } from './payment/payment.module';

import { LoggerMiddleware } from './logger.middleware';





@Module({
  imports: [ProductsModule, GroupModule, ChildrenModule, OrdersModule, HomeModule, SeasonModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
