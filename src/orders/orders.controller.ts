import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Header, Redirect, HttpStatus, HttpCode} from '@nestjs/common';

import {  CreateOrderDto  } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrdersService } from './orders.service';


@Controller('orders')
export class Orders {

    constructor(private readonly TeachersService: OrdersService) {

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
    newProduct(@Body() createOrderDto: CreateOrderDto, @Headers('token') token) {
       this.TeachersService.create(createOrderDto) 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: string) {
        this.TeachersService.delete(id)
    }

    @Put(':id')
    update(@Body() UpdateOrderDto: UpdateOrderDto, @Param('id') id: string) {
     this.TeachersService.update(UpdateOrderDto, id)
    }
  
}
