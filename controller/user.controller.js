const User = require('../models/').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @api {get} /users Show all users
 * @apiName getUsers
 * @apiGroup User
 * @apiSuccess {String} _id id of the User.
 * @apiSuccess {String} name name of the User.
 * @apiSuccess {String} firstName firstName of the User.
 * @apiSuccess {String} email email of the User.
 * @apiSuccess {String} password password of the User.
 * @apiSuccess {Date} birthday birthday of the User.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        { 
 *            "id": 1,
 *            "name": "Ribaloff",
 *            "firstName": "Greg",
 *            "email": "greg@prescience.fr",
 *            "password": "$2b$10$Q.vphQPV..2Sgi1Ziba6v.gUeUMaaoYSmHxdoT3RCu6NFUXvTgoq.",
 *            "birthday": "1982-04-03T22:00:00.000Z",
 *            "createdAt": "2020-02-10T22:15:34.000Z",
 *            "updatedAt": "2020-02-10T22:15:34.000Z"
 *        }
 *      ]
 */
exports.user_list = (req,res,next)=>{
    User.findAll({})
    .then(users => {
        res.json(users);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {get} /users/:id Show detail of one user
 * @apiName getUsersDetail
 * @apiGroup User
 * 
 * @apiParam {Number} id of the User
 * 
 * @apiSuccess {String} _id id of the User.
 * @apiSuccess {String} name name of the User.
 * @apiSuccess {String} firstName firstName of the User.
 * @apiSuccess {String} email email of the User.
 * @apiSuccess {String} password password of the User.
 * @apiSuccess {Date} birthday birthday of the User.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *        { 
 *            "id": 1,
 *            "name": "Ribaloff",
 *            "firstName": "Greg",
 *            "email": "greg@prescience.fr",
 *            "password": "$2b$10$Q.vphQPV..2Sgi1Ziba6v.gUeUMaaoYSmHxdoT3RCu6NFUXvTgoq.",
 *            "birthday": "1982-04-03T22:00:00.000Z",
 *            "createdAt": "2020-02-10T22:15:34.000Z",
 *            "updatedAt": "2020-02-10T22:15:34.000Z"
 *        }
 */
exports.user_detail = (req,res,next)=>{
    const id = req.params.id
    User.findByPk(id)
    .then(user => {
        res.json(user);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {post} /users/add Add one user
 * @apiName addUser
 * @apiGroup User
 * 
 * @apiParam {String} name name of the User.
 * @apiParam {String} firstName firstName of the User.
 * @apiParam {String} email email of the User.
 * @apiParam {String} password password of the User.
 * @apiParam {Date} birthday birthday of the User.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "Ribaloff",
*       "firstName": "Greg",
*       "email": "greg@prescience.fr",
*       "password": "fauxpwd",
*       "birthday": "16/04/2000"
*     }
 * 
 * @apiSuccess {String} _id id of the User.
 * @apiSuccess {String} name name of the User.
 * @apiSuccess {String} firstName firstName of the User.
 * @apiSuccess {String} email email of the User.
 * @apiSuccess {String} password password of the User.
 * @apiSuccess {Date} birthday birthday of the User.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        { 
 *            "id": 1,
 *            "name": "Ribaloff",
 *            "firstName": "Greg",
 *            "email": "greg@prescience.fr",
 *            "password": "$2b$10$Q.vphQPV..2Sgi1Ziba6v.gUeUMaaoYSmHxdoT3RCu6NFUXvTgoq.",
 *            "birthday": "1982-04-03T22:00:00.000Z",
 *            "createdAt": "2020-02-10T22:15:34.000Z",
 *            "updatedAt": "2020-02-10T22:15:34.000Z"
 *        }
 *      ]
 */
exports.user_signin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10,  (err,   hash) => {
    const newUser = Object.assign(req.body, {password: hash})
    //Test si le User existe ou pas
    User.create(newUser)
        .then(user => {
            res.status(200);
            res.json(user);
        })
        .catch(error=>{
            res.status(400);
            res.json(error);
        })
    })
}


/**
 * @api {put} /users/edit/:id Edit one user
 * @apiName editUser
 * @apiGroup User
 * 
 * @apiParam {Number} id id of the User.
 * @apiParam {String} name name of the User.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "Blonde"
*     }
 * 
 * @apiSuccess {String} _id id of the User.
 * @apiSuccess {String} name name of the User.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.user_edit = (req,res,next) => {
    const id = req.params.id;
    User.update(req.body, {
        where: {
          id: id
        }
    })
    .then(user => {
        res.json({message: `User ${id} est modifie`});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /users/delete/:id Delete one user
 * @apiName deleteUser
 * @apiGroup User
 * 
 * @apiParam {Number} id id of the User.
 * 
 * @apiSuccess {String} message User deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "User deleted"
 *     }
 */
exports.user_delete = (req,res,next) => {
    const id = req.params.id;
    User.destroy({
        where: {
          id: id
        }
    })
    .then(user => {
        res.json({message: "User deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}



/**
 * @api {post} /users/login User login
 * @apiName loginUser
 * @apiGroup User
 * 
 * @apiParam {String} email email of the User.
 * @apiParam {String} password password of the User.
 * @apiParamExample {json} Request-Example:
*     {
*       "email": "greg@prescience.fr",
*       "password": "fauxpwd"
*     }
 * 
 * @apiSuccess {String} message message
 * @apiSuccess {String} _id id of the User.
 * @apiSuccess {String} name name of the User.
 * @apiSuccess {String} firstName firstName of the User.
 * @apiSuccess {String} email email of the User.
 * @apiSuccess {String} password password of the User.
 * @apiSuccess {Date} birthday birthday of the User.
 * @apiSuccess {Date} createdAt createdAt of the User.
 * @apiSuccess {Date} updatedAt updatedAt of the User.
 * @apiSuccess {String} token token 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *  "message": "You win - auth ok",
 *   "user": {
 *       "id": 3,
 *       "name": "Ribaloff",
 *       "firstName": "Greg",
 *       "email": "greg@prescience.fr",
 *       "password": "$2b$10$lSQhogxYuMrslIin9ODj8u0M2e9NspP9HW0IJXrnatApJWenw36WO",
 *       "birthday": "1982-04-03T22:00:00.000Z",
 *       "createdAt": "2020-02-10T22:23:39.000Z",
 *       "updatedAt": "2020-02-10T22:23:39.000Z"
 *   },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyZWdAcHJlc2NpZW5jZS5mciIsImlhdCI6MTU4MTM3NTAyMSwiZXhwIjoxNTgxMzgyMjIxfQ.Zms2rIUfmwNhT1fE81msZ6SO1r-oFJ6kciKRvg5G70w"
}
 */  
exports.user_login = (req,res, next) => {
    User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if(user){
        verifyPassword(user,req,res);
      }
      else{
        res.json({message : "Mauvais email ou password"})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
  }
  


const verifyPassword = (user,req,res) => {
    bcrypt.compare(req.body.password, user.password,(err, result) =>{
      if(err) return res.status(500).json(err)
      else {
        if(result) return getToken(user, res)
        else return res.json({message: "You fail"});
      }
    })
  }
  
  const getToken = (user,res) => {
    const token = jwt.sign({ email: user.email, userId: user._id},process.env.JWT_KEY, {expiresIn:"2h"})
    res.json({
      message: "You win - auth ok",
      token: token
    })
  }

