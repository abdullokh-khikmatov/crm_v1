import { Module } from "@nestjs/common";
import { ChildrenProduct } from "./children.controller";
import { ChildrenService } from "./children.service";

@Module({
providers: [ChildrenService],
controllers: [ChildrenProduct]
})

export class ChildrenModule{

}