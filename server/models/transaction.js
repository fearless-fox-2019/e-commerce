const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Generate Transaction */
let TransactionSchema = new Schema({
    products : [{type : Object}],
    UserId : {type : Schema.Types.ObjectId, ref : 'User'},
    totalPrice : Number,
    transactionDate : Date,
    deliveredStatus : Boolean
})

/* middlewares/hooks */

/* 
TransactionSchema.pre('save', function(next){
    Transaction.findOne({ uniqueField : this.getUpdate().uniqueField })
    .then(data => {
        if(data){
            next({status : 500, message : 'this uniqueField has been used!'})
        }
        else {
            next()
        }
    })
}) */

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction