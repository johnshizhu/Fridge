const express = require('express')
const router = express.Router()
const dbOperation = require('../dbFiles/dbOperation')

//get central dashboard route
router.get('/', (req, res) => {
    if (loginCondition) {
        dbOperation.getUserReagents(loginID).then( result => {
            res.render('dashboard/index', { title: 'Reagent List', userData: result})
        })
    }
    else {
        res.redirect('login')
    }
})

//editing account page dashboard/manAccount
router.get('/account', (req, res) => {
    if (loginCondition) {
        res.render('dashboard/manAccount')
    }
    else {
        res.redirect('../login')
    }
})

module.exports = router