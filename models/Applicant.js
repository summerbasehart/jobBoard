var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ApplicantSchema = new mongoose.Schema ({
    id: string,
    post : { type: Schema.Types.ObjectId, ref: 'Post' },
    appName: string,
    appPhone: string,
    appEmail: string,
    appAddress1: string,
    appAddress2: string,
    appResume: string,
    updated: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Applicant', ApplicantSchema);