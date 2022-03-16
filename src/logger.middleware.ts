import {Injectable, NestMiddleware} from '@nestjs/common'
import { Request, Response} from 'express'


@Injectable()
export class LoggerMiddleware implements  NestMiddleware{
    use(req: Request, res: Request, next: () => void) {
        console.log('request happened ' + req.url)
        next()
    }
}