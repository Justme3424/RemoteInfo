const mongoose = require('mongoose')

const PCSchema = new mongoose.Schema({ 
    Hostname : String,
    OS : String,
    Versione : String,
    IP : String,
    Modello: String,
    Memoria_RAM_totale : String,
    Memoria_RAM_libera : String,
    Memoria_disco_libera : String,
    Processore: String,
    Sistema: String,
    Locazione: String,
 })

 module.exports = mongoose.model('agentdatacollecteds', PCSchema)