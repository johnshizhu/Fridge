const express = require('express')
const router = express.Router()
const dbOperation = require('../dbFiles/dbOperation')
const { user } = require('../dbFiles/dbConfig')
const bodyParser = require('body-parser')

router.use(express.urlencoded({ extended: false }))

//for displaying the login page
router.get('/', (req, res) => {
    res.render('login')
})

//for logging someone in
router.post('/', (req,res) => {
    //saving user input username and password (username and password getting through)
    let inUsername = req.body.logUsername;
    let inPassword = req.body.logPassword;
    // retrieve password from the database by using the username
    dbOperation.getPassword(inUsername).then(result => {
        dbPassword = result.recordset[0]['password']
        if (inPassword == dbPassword) {
            //res.redirect('/dashboard')
            console.log('User logged in with information ' + inUsername + ' ' + inPassword)
            loginCondition = true
            console.log("current loginCondition is: " + loginCondition)
            // setting the loginID global variable
            dbOperation.getID(inUsername).then(idResults => {
                loginID = idResults.recordset[0]['user_id']
                console.log('loginID is now ' + loginID)
                res.redirect('/dashboard')
            })
        }
        else {
            console.log("Incorrect login information")
        }
    })
})



module.exports = router