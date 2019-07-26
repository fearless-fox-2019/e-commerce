const User = require('../models/user');
const Item= require('../models/item')
const Transaction= require('../models/transaction') 

module.exports = {
   async deleteUser(){
      await User.deleteMany({})
  },

  async deleteItem(){
     await Item.deleteMany({})

  },

  deleteTransaction(done){
    
      Transaction
      .deleteMany({})
     .then(() => {
       done()
     })
     .catch(() => {
       done()
     });
   
  }

}