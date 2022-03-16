import { Injectable ,  HttpStatus, HttpCode} from "@nestjs/common";
import { CreateHomeDto } from "./dto/create-home.dto";
import { UpdateHomeDto } from "./dto/update-home.dto";

import pg from '../utils/pg/pg'
@Injectable()

export class HomeService {
    async teachers() {
        const {rows} = await pg.pgAll(`
        select t.teacher_fullname, t.teacher_date, t.teacher_addres, t.teacher_number, g.group_id, g.group_name from teachers t 
        inner join groups g on t.teacher_id  = g.group_teacher 
        `)
        return rows
    }
    
    async assistents() {
        const {rows} = await pg.pgAll(`
        select t.teacher_fullname, t.teacher_date, t.teacher_addres, t.teacher_number, g.group_id, g.group_name from teachers t 
        inner join groups g on t.teacher_id  = g.group_assistent
        `)
        return rows
    }


    async groups(){
        try {
            const {rows} = await pg.pgAll(`
            select g.group_name, ARRAY_AGG(t.teacher_fullname), count(ch.child_name) from groups g inner join teachers t on t.teacher_id = g.group_teacher
            inner join children ch on g.group_id  = ch.child_group GROUP BY g.group_name`)
            console.log(rows);

            return rows

        } catch (error) {
            return error.message
        }
    }

    async oneGroup(id: string){
        try {
            const {rows} = await pg.pgAll(`
            select g.group_name, ARRAY_AGG(t.teacher_fullname), count(ch.child_name) from groups g inner join teachers t on t.teacher_id = g.group_teacher
            inner join children ch on g.group_id  = ch.child_group  where g.group_id = $1 GROUP BY g.group_name`, id)
            console.log(rows);

            return rows

        } catch (error) {
            return error.message
        }
    }


    async children(){
        try {
            const {rows} = await pg.pgAll(`
         select ch.child_name, ch.child_address, ch.child_number, g.group_id, g.group_name, ch.child_source from children ch 
         inner join groups g on ch.child_group = g.group_id;
            `)

            return rows
        } catch (error) {
            return error.message
        }
    }

    async oneChild(id: string){
        try {
            const {rows} = await pg.pgAll(`
         select ch.child_name, ch.child_address, ch.child_number, g.group_id, g.group_name, ch.child_source from children ch 
         inner join groups g on ch.child_group = g.group_id where ch.child_id = $1;
        `, id)

            return rows
        } catch (error) {
            return error.message
        }
    }

    async datas(id: string){
        try {
            const {rows} = await pg.pgAll(`
         select ch.child_name, ch.child_address, ch.child_number, g.group_id, g.group_name, ch.child_source from children ch 
         inner join groups g on ch.child_group = g.group_id where ch.child_id = $1;
        `, id)

            return rows
        } catch (error) {
            return error.message
        }
    }


    async  create(homeDto: CreateHomeDto){
      try {
          const {rows } = await pg.pgAll(
         `insert into groups(group_name, group_teacher) 
         values($1, $2) returning *`, 
         homeDto.name, homeDto.teacher
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

    async  update(homeDto: UpdateHomeDto, id: string ){
        try {
            const {rows } = await pg.pgAll(
           `update groups set group_name = $1 
           where group_id = $2`, 
           homeDto.name,  id
            )
  
        return rows
        } catch (error) {
            return error.message 
        }
      }
}
