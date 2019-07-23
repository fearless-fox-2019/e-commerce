const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const helper =  require('./helper')

async function admin() {
  let newAdmin = await User.create({
    username: "admin",
    email: "admin@mail.com",
    password: "1234",
    role: "admin"
  });
  let loginAdmin = helper.generateJWT({
    id: newAdmin._id,
    username: "admin",
    email: "admin@mail.com",
  })
  return loginAdmin
}

async function customer() {
  let newCustomer = await User.create({
      username : 'customer', 
      email : 'customer@mail.com', 
      password : '1234', 
    });
    // console.log('newCustomer: ', newCustomer);
  let loginCustomer = helper.generateJWT({
    id: newCustomer._id,
    username: "customer",
    email: "customer@mail.com",
  })
  return loginCustomer
}

async function product(){
    let newProduct = await Product.create({
        itemName : 'sepatu', 
        stock : '10', 
        price : '10000', 
        img : 'https://www.jakartanotebook.com/images/products/100/63/25943/2/sepatu-olahraga-kasual-size-35-black-45.jpg'
    })
    return newProduct._id
}

async function deleteUser() {
  await User.deleteMany({});
}

async function deleteProduct(){
    await Product.deleteMany({});
}

async function deleteCart(){
    await Cart.deleteMany({});
}

module.exports = {
  admin,
  product,
  customer,
  deleteUser,
  deleteCart,
  deleteProduct,
};
