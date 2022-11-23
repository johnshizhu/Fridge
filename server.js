const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const dbOperation = require('./dbFiles/dbOperation')
const User = require('./dbFiles/user')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const dashboardRouter = require('./routes/dashboard')
const createActRouter = require('./routes/createAct')
const newBoxRouter = require('./routes/newBox')
const newFridgeRouter = require('./routes/newFridge')
const { user } = require('./dbFiles/dbConfig')
const newReagentRouter = require('./routes/newReagent')
const changePassRouter = require('./routes/changePass')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/dashboard', dashboardRouter)
app.use('/createAct', createActRouter)
app.use('/newBox', newBoxRouter)
app.use('/newFridge', newFridgeRouter)
app.use('/newReagent', newReagentRouter)
app.use('/changePass', changePassRouter)

global.loginCondition = false
global.loginID = null

// dbOperation.getUsers().then(res => {
//     console.log(res.recordset);
// })

// let duncan = new User('Duncan2', 'Jones2', 20, 'M', 'DUNCY2', 'jonesd2')
// dbOperation.createUser(duncan)

// dbOperation.getUserReagents(1).then(res => {
//     console.log(typeof res)
// })



app.listen(process.env.PORT || 3000)

