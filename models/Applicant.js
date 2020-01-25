var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ApplicantSchema = new mongoose.Schema ({
    post : { type: Schema.Types.ObjectId, ref: 'Post' },
    id: String,
    appName: String,
    appPhone: String,
    appEmail: String,
    appAddress1: String,
    appAddress2: String,
    appResume: String,
    updated: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Applicant', ApplicantSchema);