const Todo = require('../models/todo')

module.exports = (req, res, next) => {
    console.log('authorization')
    Todo.findById(req.params.todoId)
    .then(todo => {
        if(todo) {
            if(todo.user_id.toString() === req.headers.decoded.id) next()
            else throw {status: 401, message: 'Error authorization!'}
        } else throw { status: 400, message: 'Todo not found'}
    })
    .catch( err => next(err))
}