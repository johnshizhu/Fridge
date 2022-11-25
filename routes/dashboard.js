const express = require('express')
const router = express.Router()
const dbOperation = require('../dbFiles/dbOperation')

//get central dashboard route
router.get('/', (req, res) => {
    if (loginCondition) {
        dbOperation.getReagentInfo(loginID).then( reagents => {
            res.render('dashboard/index', { title: 'Reagent List', userData: reagents})
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
            dbOperation.getReagentInfoName(loginID, req.body.nameSearch).then( reagents => {
                res.render('dashboard/index', { title: 'Reagent Names List', userData: reagents})
            })
        }
        if (req.body.seqSearch != null) {
            dbOperation.getReagentInfoSeq(loginID, req.body.seqSearch).then( reagents => {
                res.render('dashboard/index', { title: 'Reagent Seq List', userData: reagents})
            })
        }
        
    }
    else {
        res.redirect('login')
    }
})



module.exports = router