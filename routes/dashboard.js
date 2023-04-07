const express = require('express')
const router = express.Router()
const dbOperation = require('../dbFiles/dbOperation')

//get dashboard route
router.get('/', (req, res) => {
    if (loginCondition) {
        dbOperation.getFullName(loginID).then( fullName => {
            firstName = fullName.recordset[0]['first_name']
            lastName = fullName.recordset[0]['last_name']
            dbOperation.getReagentInfo(loginID).then( reagents => {
                res.render('dashboard/index', 
                { userData: reagents, name1: firstName, name2: lastName})
            })
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

router.post('/', (req,res) => {
    console.log(req.body.nameSearch + " nameSearch")
    console.log(req.body.seqSearch + " seqSearch")
    
    if (loginCondition) {
        if (req.body.nameSearch != null) {
            dbOperation.getFullName(loginID).then( fullName => {
                firstName = fullName.recordset[0]['first_name']
                lastName = fullName.recordset[0]['last_name']
                dbOperation.getReagentInfoName(loginID, req.body.nameSearch).then( reagents => {
                    res.render('dashboard/index', 
                    { title: 'Reagent Names List', userData: reagents, name1: firstName, name2: lastName})
                })
            })
        }
        if (req.body.seqSearch != null) {
            dbOperation.getFullName(loginID).then( fullName => {
                firstName = fullName.recordset[0]['first_name']
                lastName = fullName.recordset[0]['last_name']
                dbOperation.getReagentInfoSeq(loginID, req.body.seqSearch).then( reagents => {
                    res.render('dashboard/index', 
                    { title: 'Reagent Seq List', userData: reagents, name1: firstName, name2: lastName})
                })
            })
        }
    }
    else {
        res.redirect('login')
    }
})



module.exports = router