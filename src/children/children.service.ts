import { Injectable ,  HttpStatus, HttpCode} from "@nestjs/common";
import { CreateChildrenDto } from "./dto/create-children.dto";
import { UpdateChildrenDto} from "./dto/update-children.dto";
import pg from '../utils/pg/pg'

@Injectable()

export class ChildrenService {
    async getAll() {
        const {rows} = await pg.pgAll(`select * from children`)
        return rows
    }

    async getOne(id: string){
        try {
            const {rows} = await pg.pgAll(`select * from children where child_id = $1`, id)

            return rows
        } catch (error) {
            return error.message
        }
    }

    async  create(childrenDto: CreateChildrenDto){
      try {
          const {rows } = await pg.pgAll(
         `insert into children(child_name, child_address, child_date, child_number, child_source, child_group) 
         values($1, $2, $3, $4, $5, $6) returning *`, 
          childrenDto.fullname, childrenDto.date, childrenDto.address, childrenDto.number, childrenDto.source, childrenDto.group
          )

          return rows
      } catch (error) {
          return error.message 
      }
    }

    async delete(id: string){
        try {
            const data = await pg.pgAll(`delete from children where child_id = $1`, id)
            return
        } catch (error) {
            return error.message
        }
    }

    async  update(childrenDto: UpdateChildrenDto, id: string ){
        try {
            const {rows } = await pg.pgAll(
           `update children set child_name = $1, child_address =$2, child_date =$3, child_number= $4, child_source=$5
           where child_id = $6`, 
            childrenDto.fullname, childrenDto.date, childrenDto.address, childrenDto.number, childrenDto.source, id
            )
  
        return rows
        } catch (error) {
            return error.message 
        }
      }
}
