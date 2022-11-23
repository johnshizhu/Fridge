//class for the user object
class User{
    constructor(first_name, last_name, age, sex, username, password){
        this.first_name = first_name;
        this.last_name = last_name;
        this.age =age;
        this.sex = sex;
        this.username = username;
        this.password = password;
    }
}

module.exports = User;