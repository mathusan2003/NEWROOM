const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Removed the pre-save hook for password hashing

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);
module.exports = FormDataModel;
