import { Injectable ,  HttpStatus, HttpCode} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdatePaymentDto } from "./dto/update-group.dto";

import pg from '../utils/pg/pg'
@Injectable()

export class PaymentService {
    async getAll(season: string) {
        try {
        const {rows} = await pg.pgAll(`
        select c.child_name, n.season_name, g.group_name, s.sch_sum, s.sch_payment from children c left join season_child s on c.child_id = s.sch_child 
        inner join seasons n on n.season_id = s.sch_season 
        inner join groups g on g.group_id = c.child_group
        where s.sch_season = $1
        `, season)
        return rows
        } catch (error) {
            return error.message
            
        }
    }

    async getNotNull(season: string){
        try {
            const {rows} = await pg.pgAll(`
            select c.child_name, n.season_name, s.sch_sum, s.sch_payment from children c left join season_child s on c.child_id = s.sch_child 
            inner join seasons n on n.season_id = s.sch_season 
            where s.sch_season = $1  And s.sch_sum is not null 
            `, season)
            return rows

        } catch (error) {
            return error.message
        }
    }

    async getNull(season: string){
        try {
            const {rows} = await pg.pgAll(`
            select c.child_name, n.season_name, s.sch_sum, s.sch_payment from children c left join season_child s on c.child_id = s.sch_child 
            inner join seasons n on n.season_id = s.sch_season 
            where s.sch_season = $1  And s.sch_sum is  null 
            `, season)
            return rows

        } catch (error) {
            return error.message
        }
    }

    async getByPayment(season: string, payment: string){
        try {
            const {rows} = await pg.pgAll(`
            select c.child_name, n.season_name, s.sch_sum, s.sch_payment from children c left join season_child s on c.child_id = s.sch_child 
            inner join seasons n on n.season_id = s.sch_season 
            where s.sch_season = $1 And s.sch_sum is not null And s.sch_payment = $2
            `, season, payment)
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

    async  update(teacherDto: UpdatePaymentDto, id: string ){
        try {
            const {rows } = await pg.pgAll(
           `update season_child set sch_sum = $1, sch_payment = $2 where sch_id = $3`, 
            teacherDto.sum, teacherDto.payment,  id
            )
  
        return rows
        } catch (error) {
            return error.message 
        }
      }
}
