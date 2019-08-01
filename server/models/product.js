const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    validate: [
      {
        validator: function (name) {
          return new Promise(function (resolve, reject) {
            Product.findOne({ name })
              .then(data => !data ? resolve(true) : resolve(false))
              .catch(err => reject(err))
          });
        },
        message: props => `${props.value} already registered`
      }
    ]
  },
  price: {
    type: Number,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  image: {
    type: String
  }
}, { timestamps : true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;