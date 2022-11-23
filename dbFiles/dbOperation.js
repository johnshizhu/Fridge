//organized place to put database specific commands into
const config = require('./dbConfig')
const sql = require('mssql')
const bcrypt = require('bcrypt')

const saltRounds = 10;

//get all users function
const getUsers = async() => {
    try {
        let pool = await sql.connect(config);
        let users = pool.request().query("SELECT * FROM users")
        console.log(users);
        return users;
    }
    catch(error) {
        console.log(error);
    }
}

// Create user function
const createUser = async(user) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(user.password, salt)
        let pool = await sql.connect(config);
        // console.log(hashPass) // hashed password created
        // console.log(user.password)
        let users = pool.request()
        .query(`INSERT INTO users VALUES
        ('${user.first_name}','${user.last_name}',${user.age},'${user.sex}','${user.username}','${hashPass}')
        `)
        return users;
    }
    catch(error) {
        console.log(error);
    }
}

// Get password function to compare password (temporary)
const getPassword = async(username) => {
    try {
        let pool = await sql.connect(config)
        let dbpassword = pool.request()
        .query(`SELECT password FROM users WHERE username = '${username}'`)
        //console.log(dbpassword + " this is from getPassword function");
        return dbpassword;
    }
    catch(error) {
        console.log(error)
    }
}

const getID = async(username) => {
    try {
        let pool = await sql.connect(config)
        let userID = pool.request()
        .query(`SELECT user_id FROM users WHERE username = '${username}'`)
        //console.log(dbpassword + " this is from getPassword function");
        return userID;
    }
    catch(error) {
        console.log(error)
    }
}

//return the username object from DATABASE given a user ID
const getUsername = async(ID) => {
    try {
        let pool = await sql.connect(config)
        let username = pool.request()
        .query(`SELECT username FROM users WHERE user_id = '${ID}'`)
        //console.log(dbpassword + " this is from getPassword function");
        return username;
    }
    catch(error) {
        console.log(error)
    }
}

//create Fridge
const createFridge = async(newfridge) => {
    try {
        let pool = await sql.connect(config);
        let fridge = pool.request()
        .query(`INSERT INTO fridges VALUES
        ('${newfridge.fridge_name}',${newfridge.fridge_user})
        `)
        return fridge;
    }
    catch(error) {
        console.log(error);
    }
}

//get list of all fridges
const getFridges = async() => {
    try {
        let pool = await sql.connect(config);
        let fridges = pool.request().query("SELECT fridge_name FROM fridges")
        console.log(fridges);
        return fridges;
    }
    catch(error) {
        console.log(error);
    }
}

//get all reagents from a certain user (works)
const getUserReagents = async(loginID) => {
    try {
        let pool = await sql.connect(config);
        //console.log(loginID + " This is the loginID")
        let reagents = pool.request().query(`SELECT reagent_name, reagent_date, reagent_seq FROM reagents WHERE reagent_user = ${loginID}`)
        return reagents;
    }
    catch(error) {
        console.log(error);
    }
}

//get all fridges from a certain user
const getUserFridges = async(loginID) => {
    try {
        let pool = await sql.connect(config);
        //console.log(loginID + " This is the loginID")
        let userFridges = pool.request().query(`SELECT fridge_name FROM fridges WHERE fridge_user = ${loginID}`)
        return userFridges;
    }
    catch(error) {
        console.log(error);
    }
}

//create a new box
const createBox = async(newBox) => {
    try {
        let pool = await sql.connect(config);
        let box = pool.request()
        .query(`INSERT INTO boxes VALUES 
        ('${newBox.box_name}','${newBox.box_date}',${newBox.box_size},${newBox.box_fridge},'${newBox.box_location}',${loginID})
        `)
        return box;
    }
    catch(error) {
        console.log(error);
    }
}

//get a fridge ID based on a fridge's name
const getFridgeID = async(fridgeName) => {
    try {
        let pool = await sql.connect(config);
        let ID = pool.request().query(`SELECT fridge_id FROM fridges WHERE fridge_name = '${fridgeName}'`)
        return ID;
    }
    catch(error) {
        console.log(error);
    }
}

//get a box ID based on a boxe's name
const getBoxID = async(boxName) => {
    try {
        let pool = await sql.connect(config);
        let ID = pool.request().query(`SELECT box_id FROM boxes WHERE box_name = '${boxName}'`)
        return ID;
    }
    catch(error) {
        console.log(error);
    }
}

//creating a new Reagent
const createReagent = async(newReagent) => {
    try {
        let pool = await sql.connect(config);
        let reagent = pool.request()
        .query(`INSERT INTO reagents VALUES 
        ('${newReagent.reagent_name}','${newReagent.reagent_date}','${newReagent.reagent_seq}',${newReagent.reagent_box},${loginID})
        `)
        return reagent;
    }
    catch(error) {
        console.log(error);
    }
}

//get all box names based on the logged in user id
const getUserBoxes = async(loginID) => {
    try {
        let pool = await sql.connect(config);
        //console.log(loginID + " This is the loginID")
        let userBoxes = pool.request().query(`SELECT box_name FROM boxes WHERE box_user = ${loginID}`)
        return userBoxes;
    }
    catch(error) {
        console.log(error);
    }
}

//Update password based on input password
const changePass = async(newPass, username) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query(`UPDATE users SET password = '${newPass}' WHERE username = '${username}'`)
    }
    catch(error) {
        console.log(error)
    }
}


module.exports = {
    getUsers,
    createUser,
    getPassword,
    getID,
    createFridge,
    getFridges,
    getUserReagents,
    getUserFridges,
    createBox,
    getFridgeID,
    getBoxID,
    createReagent,
    getUserBoxes,
    getUsername,
    changePass
}