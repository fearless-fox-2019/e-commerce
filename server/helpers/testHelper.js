const userModel =require('../models/userModel')

function userDelete(){
    userModel
        .deleteMany({})
        .then(()=>{
            console.log('Success delete test user');
        }) .catch(err=>  console.log(err) )
}

function createUser (newUser) {
    userModel
        .create(newUser)
        .then(created => {
            console.log('Success create user ' + created.username)
        }) .catch(err => console.log(err))
}

module.exports = {
    userDelete,
    createUser
}