import { Injectable ,  HttpStatus, HttpCode} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-orders.dto";
import { UpdateOrderDto } from "./dto/update-orders.dto";

import pg from '../utils/pg/pg'
@Injectable()

export class OrdersService {
    async getAll() {
        const {rows} = await pg.pgAll(`select * from orders`)
        return rows
    }

    async getOne(id: string){
        try {
            const {rows} = await pg.pgAll(`select * from orders where order_id = $1`, id)

            return rows
        } catch (error) {
            return error.message
        }
    }

    async  create(teacherDto: CreateOrderDto){
      try {
          const {rows } = await pg.pgAll(
         `insert into orders(order_name, order_age, order_comment, order_number) 
         values($1, $2, $3, $4) returning *`, 
          teacherDto.fullname, teacherDto.age, teacherDto.comment, teacherDto.number
          )

          return rows
      } catch (error) {
          return error.message 
      }
    }

    async delete(id: string){
        try {
            const data = await pg.pgAll(`delete from orders where order_id = $1`, id)
            return
        } catch (error) {
            return error.message
        }
    }

    async  update(teacherDto: UpdateOrderDto, id: string ){
        try {
            const {rows } = await pg.pgAll(
           `update orders set order_name = $1, order_age =$2, order_comment =$3, order_number= $4 
           where order_id = $5`, 
           teacherDto.fullname, teacherDto.age, teacherDto.comment, teacherDto.number, id
            )
  
        return rows
        } catch (error) {
            return error.message 
        }
      }
}
