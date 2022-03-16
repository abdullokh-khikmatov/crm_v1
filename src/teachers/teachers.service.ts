import { Injectable ,  HttpStatus, HttpCode} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

import pg from '../utils/pg/pg'
@Injectable()

export class TeachersService {
    private products = []

    async getAll() {
        const {rows} = await pg.pgAll(`select * from teachers`)
        return rows
    }

    async getOne(id: string){
        try {
            const {rows} = await pg.pgAll(`select * from teachers where teacher_id = $1`, id)

            return rows
        } catch (error) {
            return error.message
        }
    }

    async  create(teacherDto: CreateTeacherDto){
      try {
          const {rows } = await pg.pgAll(
         `insert into teachers(teacher_fullname, teacher_date, teacher_addres, teacher_number, teacher_role) 
         values($1, $2, $3, $4, $5) returning *`, 
          teacherDto.fullname, teacherDto.date, teacherDto.address, teacherDto.number, teacherDto.role
          )

          return rows
      } catch (error) {
          return error.message 
      }
    }

    async delete(id: string){
        try {
            const data = await pg.pgAll(`delete from teachers where teacher_id = $1`, id)
            return
        } catch (error) {
            return error.message
        }
    }

    async  update(teacherDto: UpdateTeacherDto, id: string ){
        try {
            const {rows } = await pg.pgAll(
           `update teachers set teacher_fullname = $1, teacher_date =$2, teacher_addres =$3, teacher_number= $4, teacher_role =$5
           where teacher_id = $6`, 
            teacherDto.fullname, teacherDto.date, teacherDto.address, teacherDto.number, teacherDto.role, id
            )
  
        return rows
        } catch (error) {
            return error.message 
        }
      }
}
