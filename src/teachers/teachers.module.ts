import { MiddlewareConsumer, Module } from "@nestjs/common";
import { LoggerMiddleware } from "src/logger.middleware";
import { TeacherProduct } from "./teachers.controller";
import { TeachersService } from "./teachers.service";

@Module({
providers: [TeachersService],
controllers: [TeacherProduct]
})

export class ProductsModule{
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(LoggerMiddleware)
        .forRoutes(TeacherProduct)
      }
}