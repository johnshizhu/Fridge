const express = require('express')
const router = express.Router()
const dbOperation = require('../dbFiles/dbOperation')


router.get('/', (req, res) => {
    res.render('changePass/index')
})

router.post('/', (req, res) => {
    const oldPass = req.body.oldPass
    const newPass = req.body.newPass
    const newPass2 = req.body.newPass2

    //compare oldPass to the password stored in the database with the current login ID.
    //get username based on login ID
    dbOperation.getUsername(loginID).then(username => {
        //get the password from the database
        dbOperation.getPassword(username.recordset[0]['username']).then(dataPass => {
            if (dataPass.recordset[0]['password'] == oldPass) {  //
                dbOperation.changePass(newPass, username.recordset[0]['username']).then(final => {
                    console.log('Pass Change Complete')
                    res.redirect('dashboard')
                })
            }
        })
    })

})

module.exports = router
