var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ContractorSchema = new mongoose.Schema ({
    id: String,
    company: String,
    conName: String,
    conPhone: String,
    conEmail: String,
    conAddress1: String,
    conAddress2: String,
    conMessage: String,
    updated: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Contractor', ContractorSchema);