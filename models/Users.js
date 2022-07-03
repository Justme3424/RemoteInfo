const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({ 
    Name : {type: String, required: true},
    Password : {type: String, required: true},
    Role : {type: String, enum: ['admin', 'restricted'], required: true}
 })

 module.exports = mongoose.model('Users', UserSchema)

 const user = {
     Name : 'user3',
     Password : '789',
     Role: 'restricted'
 }

 const admin = {
     Name: 'admin',
     Password: 'pass',
     Role: 'admin'
 }
 //mongoose.model('Users', UserSchema).insertMany(admin)