const Product = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart')

class CartController {
  static findAll(req, res, next){
    Cart.find({userId:req.params.id, status:'ordered'}).populate('product')
    .then((data)=>{
      let arr = []
      for (let i=0; i<data.length; i++){
        let input = {
          _id: data[i]._id,
          name: data[i].product.name,
          price: data[i].product.price,
          quantity: data[i].quantity,
          product: data[i].product._id,
          total: data[i].product.price * data[i].quantity
        }
        arr.push(input)
      }
      res.status(200).json(arr)
    })
    .catch(next)
  }

  static create(req, res, next){
    Product.findOne({_id: req.body.product})
    .then(product =>{
      if((product.stock - 1) < 0) {
          throw({
              code: 400,
              message: `Sorry,${product.title} is out of stock`
          })
      }
      return Cart.findOne({product: req.body.product, status:null })
    })
    .then(found =>{
      if(found){

          Cart.update({_id: found._id}, {$inc: { quantity: req.body.quantity }})
          .then(updated =>{
              res.status(201).json(updated)
          })
      }else{
        let input = {
            status: 'ordered',
            userId: req.body.userId,
            product: req.body.product,
            quantity: req.body.quantity,
        }

        Cart.create(input)
            .then((newCart)=>{
              res.status(201).json(newCart)
            })
            .catch(next)
      }
    })
    .catch(next)
  }

  static delete(req, res, next){
    Cart.deleteOne({
      _id : req.params.id
    })
    .then((data)=>{
        res.status(200).json(data)
    })
    .catch(next)
  }

//   static update (req, res, next){
//     let input = {
//         title : req.body.title,
//         content : req.body.content,
//         created_at : new Date(),
//         fileUrl: req.file.cloudStoragePublicUrl,
//         UserId : req.user._id
//     }
//     Product.updateOne({_id: req.params.id}, input)
//     .then((data)=>{
//         res.status(200).json(data)
//     })
//     .catch(next)
// }

  static checkout(req, res, next) {
    // console.log('masuk checkout')
    console.log('ini params', req.params.id)
    console.log('ini body', req.body)
    let arr = []
    for (let i=0; i<req.body.length; i++){
      // console.log('ini req id', req.body[i]._id)
      arr.push(Product.findOne({_id : req.body[i].product}))
      console.log('======= ini product id', req.body[i].product)
    }
    return Promise.all(arr)
    .then((data)=>{
      let arr2=[]
      for (let i=0; i<data.length; i++){
        data[i].stock -= req.body[i].quantity 
        arr2.push(data[i].save())
      }
      return Promise.all(arr2)
      .then((result)=>{
        return Cart.update({userId:req.params.id, status:'ordered'}, {"$set":{"status": 'purchased'}}, { multi: true })
      })
      .then((result)=>{
        res.status(200).json(result)
      })
    })
    .catch(next)
  }
}

module.exports = CartController