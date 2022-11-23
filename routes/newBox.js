const express = require('express')
const router = express.Router()
const dbOperation = require('../dbFiles/dbOperation')
const Box = require('../dbFiles/box')


//for displaying the login page
router.get('/', (req, res) => {
    if (loginCondition) {
        dbOperation.getUserFridges(loginID).then( result => {
            res.render('newBox/index', { title: 'FridgesList', userData: result})
        })
    }
    else {
        res.redirect('login')
    }
    //res.render('newBox')
})

//for creating a new box
//need to get the fridge ID based on the fridge name
router.post('/', (req,res) => {
    fridgeName = req.body.newBoxFridge
    //get the INT that is the fridge ID based on the save name from above, using another dbOperation function
    dbOperation.getFridgeID(fridgeName).then( fridgeID => {
        let newID = fridgeID.recordset[0]['fridge_id']
        let newBox = new Box(req.body.newBoxName, req.body.newBoxDate, req.body.newBoxSize, newID, req.body.newBoxLocation)
        console.log("CREATING BOX")
        dbOperation.createBox(newBox)
        res.redirect('dashboard')
    })
    
})


module.exports = router