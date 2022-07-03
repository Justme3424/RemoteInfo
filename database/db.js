const mongoose = require('mongoose')
const url = 'mongodb+srv://AgentUsr:Logiologio1998@cluster0.7bqpr.mongodb.net/AgentData?retryWrites=true&w=majority'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const connection = mongoose.connection
module.exports = connection