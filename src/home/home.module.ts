import { Module } from "@nestjs/common";
import { Home } from "./home.controller";
import { HomeService } from "./home.service";

@Module({
providers: [HomeService],
controllers: [Home]
})

export class HomeModule{

}