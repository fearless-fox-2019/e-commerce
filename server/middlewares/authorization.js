// const Article = require('../models/article')

module.exports = {
    authorization (req, res, next){
        console.log('masuk authorization')
        Article.findById(req.params.id)
            .then((article)=>{
                console.log('ini article', article)
                if (article.UserId == req.user.id){
                    next()
                }
                else {
                    throw {status: 400, message: "Unauthorized"}
                }
            })
        .catch(next)
    }
}