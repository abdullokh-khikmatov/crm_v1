import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Header, Redirect, HttpStatus, HttpCode} from '@nestjs/common';

import {  CreateHomeDto  } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { HomeService } from './home.service';


@Controller('home')
export class Home {
   
   constructor(private readonly GroupsService: HomeService) {
   }
   @Get('children')
   getChildren(){
      return this.GroupsService.children()
   }

   @Get('children/:id')
   getOneChild(@Param('id')id: string){
      return this.GroupsService.oneChild(id)
   }


   @Get('groups')
   getOne() {
      return  this.GroupsService.groups()
   }

   @Get('group/:id')
   getOneGroup(@Param('id') id: string) {
      return  this.GroupsService.oneGroup(id)
   }
 
   @Get('assistents')
   getTeachers(){
      return this.GroupsService.assistents()
   }
    @Get('teachers')
    getAll(){
       return this.GroupsService.teachers()
    }





    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('name', "value")
    newProduct(@Body() createHomeDto: CreateHomeDto, @Headers('token') token) {
       this.GroupsService.create(createHomeDto) 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: string) {
        this.GroupsService.delete(id)
    }

    @Put(':id')
    update(@Body() UpdateHomeDto: UpdateHomeDto, @Param('id') id: string) {
     this.GroupsService.update(UpdateHomeDto, id)
    }
  
}
