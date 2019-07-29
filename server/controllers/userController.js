const User = require('../models/user')
const {
    compareSync
} = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')


class UserController {

    static register(req, res, next) {
        User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
                email: req.body.email,
            })
            .then(user => {
                if (user) {

                    let isSame = compareSync(req.body.password, user.password)
                    if (isSame) {
                        let payload = {
                            _id: user._id,
                            email: user.email
                        }
                        let access_token = jwt.sign(payload)
                        console.log(access_token);

                        res.status(200).json({
                            access_token: access_token,
                            name: user.name,
                            email: user.email
                        })
                    } else next({
                        code: 400,
                        message: 'Wrong email/password'
                    })
                } else
                    next({
                        code: 400,
                        message: 'Wrong email/password'
                    })
            })
            .catch(next)
    }
}

module.exports = UserController