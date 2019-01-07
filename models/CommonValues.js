const mongoose = require('mongoose');
const { Schema } = mongoose;

const commonValuesSchema = new Schema({
    category: String,
    values: [{ type: String }]
});

module.exports = mongoose.model('commonValues', commonValuesSchema);