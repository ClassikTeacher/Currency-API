const axios = require('axios')
const moment = require('moment')
const logerService = require('./LogerService')
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
let reqToday: boolean = false
let secondReqTyday: boolean = false
let resetDay: boolean = true

type responseData = {
    date: string;
    base: string;
    rates: {
        RUB: number;
        EUR: number;
        USD: number;
        JPY: number;
    }
}


class CurrencyService{

    async getCurrencyRates(){
        
        const rates = await this.fetchCurencyRates()
        const resultSave = await this.saveCurrencyRates(rates.data)
        
           
         return resultSave
    }


    async fetchCurencyRates(){
        const data = await axios.get(`${process.env.CURRENCY_URL}` + process.env.RATES)
            .then((response:any) => {
                return response
            })
            .catch(() => {throw new Error})
        
        return data
    }

    async fetchCurencyRatesByDate(){
        const date1 = ['historical/2020-06-20', 'historical/2021-06-20', 'historical/2021-08-20', 'historical/2022-06-20']
        
        const data =  date1.map( async (item: string) => {
            await axios.get(`https://api.currencyfreaks.com/${item}?apikey=cfc05bd41dcf4edebc24edd53242dba0` + process.env.RATES)
            .then((response:any) => {
                return response
            })
            .catch(() => {throw new Error})
        }) 
            
        
        return data
    }

    async saveCurrencyRates(datas: responseData){

            const date = moment(datas.date).format('yyyy-MM-DD')
            
        const newItem = await prisma.currency.create({
            data:{
                date: new Date(date),
                USD: Number(datas.rates.USD),
                EUR: Number(datas.rates.EUR),
                RUB: Number(datas.rates.RUB),
                JPY: Number(datas.rates.JPY),
            }
        })
        return newItem
    }



    async requestInNewDay(){
        const hour = Number(moment().format('H'))
        this.resetDay(hour)
        if(reqToday){
            if(hour >= 12 && !secondReqTyday){
                const rates = await this.fetchCurencyRates()
                const resultSave = await this.saveCurrencyRates(rates.data)
                if(resultSave){ 
                    secondReqTyday = true 
                    return resultSave
                }
            }
            return reqToday
        }
        const rates = await this.fetchCurencyRates()
        const resultSave = await this.saveCurrencyRates(rates.data)
        if(resultSave){ 
            reqToday = true 
            return resultSave
        }
        
        return false
    }

    resetDay(hour: number){
        if(hour == 0 && resetDay){
            reqToday = false
            secondReqTyday = false
            resetDay = false
        } else if(hour !== 0 && !resetDay){
            resetDay = true
        }
    }

    async getCurrencyByDate(date: string){
        const choiceDate = new Date(moment(date).format('yyyy-MM-DD'))
        const currency = await prisma.currency.findFirst({
            where:{ 
                date: choiceDate
            },
        })
        if(currency){
            const log = await logerService.saveRequestLog('by date', currency?.id)
            if(!log){
                throw new Error('Eroor in save logs')
            }
           return currency 
        } 
        return 'no date'
    }

    async getCurrencyByTicker(ticker: string[]){
        const tickerOne = ticker[0]
        const tickerTwo = ticker[1]
        const date = new Date(moment().format('yyyy-MM-DD'))
        const currency = await prisma.currency.findFirst({
            where:{ 
                date: date,
                
            }, 
                      
        })
        const objCurrency = {...currency}
        const arrTicker  = Object.entries(objCurrency).filter(item => item[0] === tickerOne || item[0]===tickerTwo)
        const log = await logerService.saveRequestLog('by ticker', currency?.id)
        if(!log){
            throw new Error('Eroor in save logs')
        }
        
        return arrTicker
    }
    


}

module.exports = new CurrencyService()