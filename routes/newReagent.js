const express = require('express')
const router = express.Router()
const dbOperation = require('../dbFiles/dbOperation')
const Reagent = require('../dbFiles/reagent')


//for displaying the login page
router.get('/', (req, res) => {
    if (loginCondition) {
        //res.render('newReagent/index')
        dbOperation.getUserBoxes(loginID).then( result => {
            res.render('newReagent/index', { title: 'BoxesList', userData: result})
        })
    }
    else {
        res.redirect('login')
    }
})

//For creating a new reagent
//given the box name, go into and get out the box id
router.post('/', (req,res) => {
    boxName = req.body.newReagentBox
    dbOperation.getBoxID(boxName).then( boxID => {
        let newID = boxID.recordset[0]['box_id']
        let newReagent = new Reagent(req.body.newReagentName, req.body.newReagentDate, req.body.newReagentSeq, newID)
        console.log("CREATING REAGENT")
        dbOperation.createReagent(newReagent)
        res.redirect('dashboard')
    })
})



module.exports = router
