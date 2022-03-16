import { Injectable ,  HttpStatus, HttpCode} from "@nestjs/common";
import { CreateSeasonDto } from "./dto/create-season.dto";
import { UpdateSeasonDto } from "./dto/update-season.dto";

import pg from '../utils/pg/pg'
@Injectable()

export class SeasonsService {
    private products = []

    async getAll() {
        try {
            const {rows} = await pg.pgAll(`select * from seasons`)
        return rows
        } catch (error) {
            return error.message
        }
    }

    async getOne(id: string){
        try {
            const {rows} = await pg.pgAll(`select * from seasons where season_id = $1`, id)

            return rows
        } catch (error) {
            return error.message
        }
    }

    async  create(seasonDto: CreateSeasonDto){
      try {
          const {rows } = await pg.pgAll(
         `insert into seasons(season_name) 
         values($1) returning *`, 
         seasonDto.name,
          )

          console.log(rows);
          

          const data = await pg.pgAll(`select * from children`)

          data.rows.forEach(e => {
          pg.pgAll(`insert into season_child(sch_child, sch_season) values($1, $2)`, e.child_id, rows[0].season_id)
          });
          
          return rows
      } catch (error) {
          return error.message 
      }
    }

    async delete(id: string){
        try {
            const data = await pg.pgAll(`delete from seasons where season_id = $1`, id)
            return
        } catch (error) {
            return error.message
        }
    }

    async  update(seasonDto: UpdateSeasonDto, id: string ){
        try {
            const {rows } = await pg.pgAll(
           `update seasons set season_name = $1 
           where season_id = $2`, 
           seasonDto.name,  id
            )
  
        return rows
        } catch (error) {
            return error.message 
        }
      }
}
