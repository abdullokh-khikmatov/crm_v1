import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Header, Redirect, HttpStatus, HttpCode} from '@nestjs/common';

import {  CreateTeacherDto  } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersService } from './teachers.service';


@Controller('teachers')
export class TeacherProduct {

    constructor(private readonly TeachersService: TeachersService) {

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
    newProduct(@Body() createProductDto: CreateTeacherDto, @Headers('token') token) {
       this.TeachersService.create(createProductDto) 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: string) {
        this.TeachersService.delete(id)
    }

    @Put(':id')
    update(@Body() UpdateProductDto: UpdateTeacherDto, @Param('id') id: string) {
     this.TeachersService.update(UpdateProductDto, id)
    }
  
}
