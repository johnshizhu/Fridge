const express = require('express')
const router = express.Router()
const Fridge = require('../dbFiles/fridge')
const dbOperation = require('../dbFiles/dbOperation')



//for displaying the new Fridge page
router.get('/', (req, res) => {
    if (loginCondition) {
        res.render('newFridge')
    }
    else {
        res.redirect('login')
    }
})

router.post('/', (req,res) => {
    let newFridge = new Fridge(req.body.newFridgeName, loginID)
    dbOperation.createFridge(newFridge)
    res.redirect('dashboard')
})


module.exports = router