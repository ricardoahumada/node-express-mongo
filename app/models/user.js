const mongoose     = require('mongoose','mongoose-type-email');
const Schema       = mongoose.Schema;


const UserSchema   = new Schema({
    name: String,
    surname: String,
    email: {
        type: String,
        required: true,
        unique: true //[true, 'Email already used']
    },
    password: String,
    country: String,
    city: String
});

module.exports = mongoose.model('User', UserSchema);