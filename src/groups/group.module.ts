import { Module } from "@nestjs/common";
import { GroupProduct } from "./group.controller";
import { GroupService } from "./group.service";

@Module({
providers: [GroupService],
controllers: [GroupProduct]
})

export class GroupModule{

}