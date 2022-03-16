import { Injectable ,  HttpStatus, HttpCode} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

import pg from '../utils/pg/pg'
@Injectable()

export class GroupService {
    private products = []

    async getAll() {
        const {rows} = await pg.pgAll(`select * from groups`)
        return rows
    }

    async getOne(id: string){
        try {
            const {rows} = await pg.pgAll(`select * from groups where group_id = $1`, id)

            return rows
        } catch (error) {
            return error.message
        }
    }

    async  create(teacherDto: CreateGroupDto){
      try {
          const {rows } = await pg.pgAll(
         `insert into groups(group_name, group_teacher, group_assistent) 
         values($1, $2, $3) returning *`, 
          teacherDto.name, teacherDto.teacher,  teacherDto.assistent
          )

          return rows
      } catch (error) {
          return error.message 
      }
    }

    async delete(id: string){
        try {
            const data = await pg.pgAll(`delete from groups where group_id = $1`, id)
            return
        } catch (error) {
            return error.message
        }
    }

    async  update(teacherDto: UpdateGroupDto, id: string ){
        try {
            const {rows } = await pg.pgAll(
           `update groups set group_name = $1 
           where group_id = $2`, 
            teacherDto.name,  id
            )
  
        return rows
        } catch (error) {
            return error.message 
        }
      }
}
