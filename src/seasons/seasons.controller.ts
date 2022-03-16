import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Header, Redirect, HttpStatus, HttpCode} from '@nestjs/common';

import {  CreateSeasonDto  } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonsService } from './seasons.service';


@Controller('seasons')
export class SeasonsController {

    constructor(private readonly GroupsService: SeasonsService) {

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
    newProduct(@Body() createProductDto: CreateSeasonDto, @Headers('token') token) {
       this.GroupsService.create(createProductDto) 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: string) {
        this.GroupsService.delete(id)
    }

    @Put(':id')
    update(@Body() UpdateProductDto: UpdateSeasonDto, @Param('id') id: string) {
     this.GroupsService.update(UpdateProductDto, id)
    }
  
}
