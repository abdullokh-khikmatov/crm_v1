import { Module } from "@nestjs/common";
import { Orders } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
providers: [OrdersService],
controllers: [Orders]
})

export class OrdersModule{

}