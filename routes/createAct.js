const express = require('express')
const router = express.Router()
const User = require('../dbFiles/user')
const dbOperation = require('../dbFiles/dbOperation')
const { user } = require('../dbFiles/dbConfig')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const saltRounds = 10

router.use(express.urlencoded({ extended: false }))

router.get('/', (req, res) => {
    res.render('createAct', { user: new User() })
})

//create a new user
router.post('/', (req,res) => {
    let newUser = new User(req.body.fname, req.body.lname, req.body.age, req.body.sex , req.body.username, req.body.pass1)
    dbOperation.createUser(newUser)
    res.redirect('login')
})


module.exports = router