const Router = require('express')
const express = require('express')
const currencyController = require('../controllers/CurrencyController')
const ApiKeyMiddleware = require('../middleware/apiKeys-middleware')
const cors = require('cors')

const router = new Router()
const options = { 
    origin: 'http://localhost:3000',
    credentials: true, 

}

router.get('/currency/date', ApiKeyMiddleware, cors(options), currencyController.getCurrencyByDate)
router.get('/currency/ticker', ApiKeyMiddleware, cors(options), currencyController.getCurrencyByTicket)
router.get('/currency/getapikey', currencyController.getApiKey)
router.get('/currency/Allapikey', currencyController.getAllApiKey)




module.exports = router
export{}