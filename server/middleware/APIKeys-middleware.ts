const tokenService = require('../service/TokenService')

module.exports = async function(req:any, res:any, next:Function){
    try{
        const APIKey = req.headers.key
        if(!APIKey){
           next(Error('no API key'))
        }
        const key = await tokenService.checkAPIKey(APIKey)
        if(!key){
            next(Error('not valid API key'))
        }
        
        next()
    }catch(e){
       throw new Error()
    }
}