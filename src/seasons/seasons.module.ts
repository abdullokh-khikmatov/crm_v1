import { Module } from "@nestjs/common";
import { SeasonsController } from "./seasons.controller";
import { SeasonsService } from "./seasons.service";

@Module({
providers: [SeasonsService],
controllers: [SeasonsController]
})

export class SeasonModule{

}