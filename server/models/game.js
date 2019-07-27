const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

/* Generate Game */
let GameSchema = new Schema({
    name : {
        type :  String,
        required : [true, 'name can\'t be blank!'],
        unique : true
    },
    description : {
        type : String,
    },
    image : {
        type : String        
    },
    price : {
        type :  Number,
        required : [true, 'price can\'t be blank!']
    },
    stock : {
        type :  Number,
        required : [true, 'stock can\'t be blank!']
    },
    screenShots : []    
})

/* middlewares/hooks */


// GameSchema.pre('updateOne', (next) => {
//     Game.findOne({ name : this.getUpdate().name })
//     .then(data => {
//         console.log(data)
//         if(data){
//             next({status : 400, message : 'this name has been used!'})
//         }
//         else {
//             next()
//         }
//     })
// })

GameSchema.plugin(uniqueValidator, { message: 'Error, {PATH} {VALUE} has already on the list!' });

const Game = mongoose.model('Game', GameSchema)

module.exports = Game