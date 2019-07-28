const jwt = require('jsonwebtoken')
const Article = require('../models/article')
module.exports = (req, res, next) => {
    console.log('halo')
    Article.findById(req.params.id)
        // res.json(req.params)
        .then(article => {
            // res.json(user)
            console.log(article)

            if (article) {
                // console.log(req.user.id)
                // console.log(user.UserId)
                console.log(article.author)
                    console.log(req.headers.decoded._id)
                    if (article.author == req.headers.decoded._id) {
                        console.log('halo')
                        next()
                    } else {
                        next({ status: 403, message: 'not authorize' })
                    }
            } else {
                next({ status: 403, message: 'not authorize' })
            }
        })
}