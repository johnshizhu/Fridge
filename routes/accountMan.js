const express = require('express')
const router = express.Router()
const dbOperation = require('../dbFiles/dbOperation')

router.get('/', (req, res) => {
    if (loginCondition) {
        res.render('accountMan/index')

    }
    else {
        res.redirect('login')
    }
})





module.exports = router