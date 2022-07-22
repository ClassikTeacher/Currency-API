const tokenService = require('../service/TokenService')
const currencyService = require('../service/CurrencyService')
const logerService = require('../service/LogerService')


class CurrencyController{

    async getCurrencyByDate(req:any, res:any, next:Function){
        try{
            const {date} = req.body
            const arrDate = date.split('-')
            const newDate = new Date(arrDate[0], Number(arrDate[1])-1, Number(arrDate[2]))
            if (newDate.getFullYear() === Number(arrDate[0]) && newDate.getMonth() === Number(arrDate[1])-1 && newDate.getDate() === Number(arrDate[2])) {
                const response = await currencyService.getCurrencyByDate(date)
                // res.header("Access-Control-Allow-Origin", "*")
                res.json(response)
            } else {
                res.json('Not valid date')
            }
            
        } catch(e){
            console.log(e)
            next(e)
        }  
    }

    async getCurrencyByTicket(req:any, res:any, next:Function){
        try{
            const {ticker} = req.body
            
            if(ticker.length === 2){
                const arrTicker = await currencyService.getCurrencyByTicker(ticker)
                
                res.json(arrTicker) 
            }
           
           next()
        } catch(e){
            console.log(e)
            next(e)
        }  
    }


    async getApiKey(req:any, res:any, next:Function){
        try{
            
            const response = await tokenService.createAPIKey()
            res.cookie('apikey', response.key, {maxAge: 24*60*60*1000, httpOnly: true})
            res.json(response)
        } catch(e){
            console.log(e)
            next(e)
        } 
    }

    async getAllApiKey(req:any, res:any, next:Function){
        try{
            
            const response = await tokenService.getAllAPIKey()
            
            res.json(response)
        } catch(e){
            console.log(e)
            next(e)
        } 
    }

}

module.exports = new CurrencyController()
export{}