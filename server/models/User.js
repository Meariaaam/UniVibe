const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
     password: { type: String, required: true, select: false }, //password safety select false when User.find() password wont come unless you axplicitly ask for it
    mecenatImage: { type: String, required: false}, 
    isVerified: { type: Boolean, default: false },


});
module.exports = mongoose.model('User', userSchema);  
