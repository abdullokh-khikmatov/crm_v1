import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Header, Redirect, HttpStatus, HttpCode} from '@nestjs/common';

import {  CreateGroupDto  } from './dto/create-group.dto';
import { UpdatePaymentDto } from './dto/update-group.dto';
import { PaymentService } from './payment.service';


@Controller('payment')
export class PaymentController {

    constructor(private readonly PaymentService: PaymentService) {

    }
 
    @Get(':season')
    getAll(@Param('season') season: string){
       return this.PaymentService.getAll(season)
    }
    @Get('notnull/:season')
    getNotNull(@Param('season') season: string) {
       return  this.PaymentService.getNotNull(season)
    }

    @Get('null/:season')
    getNull(@Param('season') season: string) {
       return  this.PaymentService.getNull(season)
    }

    @Get('/:season/:payment')
    getPaymentByType(@Param('season') season: string, @Param('payment') payment: string) {
       return  this.PaymentService.getByPayment(season, payment)
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('name', "value")
    newProduct(@Body() createProductDto: CreateGroupDto, @Headers('token') token) {
       this.PaymentService.create(createProductDto) 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: string) {
        this.PaymentService.delete(id)
    }

    @Put(':id')
    update(@Body() UpdateProductDto: UpdatePaymentDto, @Param('id') id: string) {
     this.PaymentService.update(UpdateProductDto, id)
    }
  
}
