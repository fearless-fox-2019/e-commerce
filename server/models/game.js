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
})

/* middlewares/hooks */

/* 
GameSchema.pre('save', function(next){
    Game.findOne({ uniqueField : this.getUpdate().uniqueField })
    .then(data => {
        if(data){
            next({status : 500, message : 'this uniqueField has been used!'})
        }
        else {
            next()
        }
    })
}) */

GameSchema.plugin(uniqueValidator, { message: 'Error, {PATH} {VALUE} has already on the list!' });

const Game = mongoose.model('Game', GameSchema)

module.exports = Game