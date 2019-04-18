const mongoose     = require('mongoose','mongoose-type-email');
const Schema       = mongoose.Schema;

const PetSchema   = new Schema({
    name: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },    
    edad: Number
});

module.exports = mongoose.model('Pet', PetSchema);