const Gender = require('../models/').Gender;

/**
 * @api {get} /genders Show all genders
 * @apiName getGenders
 * @apiGroup Gender
 * @apiSuccess {String} _id id of the Gender.
 * @apiSuccess {String} name name of the Gender.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "name": "Blonde"
 *     }]
 */
exports.gender_list = (req,res,next)=>{
    Gender.findAll({})
    .then(genders => {
        res.json(genders);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 *  * @api {get} /genders/:id Show detail of one gender
 * @apiName getGendersDetail
 * @apiGroup Gender
 * 
 * @apiParam {Number} id of the Gender
 * 
 * @apiSuccess {String} _id id of the Gender.
 * @apiSuccess {String} name name of the Gender.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.gender_detail = (req,res,next)=>{
    const id = req.params.id
    Gender.findByPk(id)
    .then(gender => {
        res.json(gender);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {post} /genders/add Add one gender
 * @apiName addGender
 * @apiGroup Gender
 * 
 * @apiParam {String} name name of the Gender.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "France"
*     }
 * 
 * @apiSuccess {String} _id id of the Gender.
 * @apiSuccess {String} name name of the Gender.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "France",
 *       "updatedAt": "2020-03-17T15:26:58.984Z",
 *       "createdAt": "2020-03-17T15:26:58.984Z"
 *     }
 */
exports.gender_add = (req,res,next) => {
    Gender.create(req.body)
    .then(gender => {
        res.json(gender);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {put} /genders/edit/:id Edit one gender
 * @apiName editGender
 * @apiGroup Gender
 * 
 * @apiParam {Number} id id of the Gender.
 * @apiParam {String} name name of the Gender.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "Blonde"
*     }
 * 
 * @apiSuccess {String} _id id of the Gender.
 * @apiSuccess {String} name name of the Gender.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.gender_edit = (req,res,next) => {
    const id = req.params.id;
    Gender.update(req.body, {
        where: {
          id: id
        }
    })
    .then(gender => {
        res.json({message: `Gender ${id} est modifie`});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /genders/delete/:id Delete one gender
 * @apiName deleteGender
 * @apiGroup Gender
 * 
 * @apiParam {Number} id id of the Gender.
 * 
 * @apiSuccess {String} message Gender deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Gender deleted"
 *     }
 */
exports.gender_delete = (req,res,next) => {
    const id = req.params.id;
    Gender.destroy({
        where: {
          id: id
        }
    })
    .then(gender => {
        res.json({message: "Gender deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}


