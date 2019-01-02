const mongoose = require('mongoose');
const { Schema } = mongoose;

const mineralSchema = new Schema({
    name: String,
    class: String,
    HMSymbol: String,
    category: String,
    color: String,
    habit: String,
    twinning: String,
    cleavage: String,
    fracture: String,
    tenacity: String,
    mohsLow: Number,
    mohsHigh: Number,
    luster: String,
    streak: String,
    diaphaneity: String,
    gravityLow: Number,
    gravityHigh: Number,
    refractive: String,
    birefringence: String,
    pleochroism: String,
    dispersion: String,
    solubility: String,
    fluorescence: String,
    formula: String,
    molweight: String,
    strunz: String,
    dana: String,
    crystalSystem: String,
    unitCell: String,
    symmetry: String,
    opticalprop: String,
    image: String
});

module.exports = mongoose.model('mineral', mineralSchema);