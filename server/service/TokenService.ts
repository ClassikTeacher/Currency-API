const jwt = require('jsonwebtoken')
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

class TokenService {
    async createAPIKey(){
       const payload = {key: Math.random()}
       const newToken = jwt.sign(payload, 'qwerty', {expiresIn: '1d'}).split('.')

       const saveToken = await prisma.api_keys.create({
            data: {
                key: newToken[2]
            }   
       })
       return saveToken
    }

    async getAllAPIKey(){
        
        const saveToken = await prisma.api_keys.findMany({
            
        })
        return saveToken
     }

    async checkAPIKey(apiKey: string){
        
        const saveToken = await prisma.api_keys.findFirst({
            where:{key: apiKey}
        })
        return saveToken
     }

}


module.exports = new TokenService()