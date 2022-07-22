const express = require('express')
const router = require('./router/index.ts')
const cors = require('cors')
require('dotenv').config()
const currencyService = require('./service/CurrencyService')



const PORT = process.env.PORT || 5000


const app = express()

// При инициализации сервера заполнить БД первоначальными данными курсов валют по нескольким датам 
// Для доступа к датам необходим платный тариф и у меня оно не работает, возможности проверить нет, но реализация должна быть примерно такой
// (async () => {
//     await currencyService.fetchCurencyRatesByDate()  
// })()     

setInterval( async ()=>{
    const req = await currencyService.requestInNewDay()
    console.log(req)
},10000)


app.use(express.json())
app.use('/api', router)
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))


app.listen(PORT, console.log(`Server started on PORT:${PORT}`))