const moment = require('moment')
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
class LogerService {
    async saveRequestLog(req:string, id: number){
        const date = moment().format('yyyy-MM-DD')
            
        const newLog = await prisma.logs_req.create({
            data:{
                date: new Date(),
                type_req: req,
                id_currency: id
            }
        })
        return newLog
    }
    
}

module.exports = new LogerService()