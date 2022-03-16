import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Header, Redirect, HttpStatus, HttpCode} from '@nestjs/common';

import {  CreateChildrenDto  } from './dto/create-children.dto';
import { UpdateChildrenDto } from './dto/update-children.dto';
import { ChildrenService } from './children.service';


@Controller('children')
export class ChildrenProduct {

    constructor(private readonly TeachersService: ChildrenService) {

    }
 
    @Get()
    getAll(){
       return this.TeachersService.getAll()
    }
    @Get(':id')
    getOne(@Param('id') id: string) {
       return  this.TeachersService.getOne(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('name', "value")
    newProduct(@Body() createChildrenDto: CreateChildrenDto, @Headers('token') token) {
       this.TeachersService.create(createChildrenDto) 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: string) {
        this.TeachersService.delete(id)
    }

    @Put(':id')
    update(@Body() UpdateChildrentDto: UpdateChildrenDto, @Param('id') id: string) {
     this.TeachersService.update(UpdateChildrentDto, id)
    }
  
}
