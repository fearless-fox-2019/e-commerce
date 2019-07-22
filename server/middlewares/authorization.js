const Article = require('../models/articles')

module.exports = (req, res, next)  => {
  Article.findById(req.params.id)
  .then(foundArticle => {
    if(!foundArticle){
      throw ({code : 404 , message : 'resource not found'})
    } else  {
      if(foundArticle.user == req.user._id){
        next()
      }else{
        throw ({code : 401 , message : 'not authorized'})
      }
    }
  })
  .catch(next)
}