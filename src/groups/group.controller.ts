import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Header, Redirect, HttpStatus, HttpCode} from '@nestjs/common';

import {  CreateGroupDto  } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';


@Controller('groups')
export class GroupProduct {

    constructor(private readonly GroupsService: GroupService) {

    }
 
    @Get()
    getAll(){
       return this.GroupsService.getAll()
    }
    @Get(':id')
    getOne(@Param('id') id: string) {
       return  this.GroupsService.getOne(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('name', "value")
    newProduct(@Body() createProductDto: CreateGroupDto, @Headers('token') token) {
       this.GroupsService.create(createProductDto) 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: string) {
        this.GroupsService.delete(id)
    }

    @Put(':id')
    update(@Body() UpdateProductDto: UpdateGroupDto, @Param('id') id: string) {
     this.GroupsService.update(UpdateProductDto, id)
    }
  
}
