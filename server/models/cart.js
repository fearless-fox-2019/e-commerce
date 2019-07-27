const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Generate Model */
let CartSchema = new Schema({    
  UserId : {type : Schema.Types.ObjectId, ref : 'User'},
  GameId : {type : Schema.Types.ObjectId, ref : 'Game'},
  quantity : Number,
  totalPrice : Number,
  checkoutStatus : Boolean
})

/* middlewares/hooks */

/* 
ModelSchema.pre('save', function(next){
    Model.findOne({ uniqueField : this.getUpdate().uniqueField })
    .then(data => {
        if(data){
            next({status : 500, message : 'this uniqueField has been used!'})
        }
        else {
            next()
        }
    })
}) */

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart