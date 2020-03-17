const Country = require('../models/').Country;

/**
 * @api {get} /countries Show all countries
 * @apiName getCountries
 * @apiGroup Country
 * @apiSuccess {String} _id id of the Country.
 * @apiSuccess {String} name name of the Country.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "name": "Blonde"
 *     }]
 */
exports.country_list = (req,res,next)=>{
    Country.findAll({})
    .then(countries => {
        res.json(countries);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 *  * @api {get} /countries/:id Show detail of one country
 * @apiName getCountriesDetail
 * @apiGroup Country
 * 
 * @apiParam {Number} id of the Country
 * 
 * @apiSuccess {String} _id id of the Country.
 * @apiSuccess {String} name name of the Country.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.country_detail = (req,res,next)=>{
    const id = req.params.id
    Country.findByPk(id)
    .then(country => {
        res.json(country);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {post} /countries/add Add one country
 * @apiName addCountry
 * @apiGroup Country
 * 
 * @apiParam {String} name name of the Country.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "France"
*     }
 * 
 * @apiSuccess {String} _id id of the Country.
 * @apiSuccess {String} name name of the Country.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "France",
 *       "updatedAt": "2020-03-17T15:26:58.984Z",
 *       "createdAt": "2020-03-17T15:26:58.984Z"
 *     }
 */
exports.country_add = (req,res,next) => {
    Country.create(req.body)
    .then(country => {
        res.json(country);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {put} /countries/edit/:id Edit one country
 * @apiName editCountry
 * @apiGroup Country
 * 
 * @apiParam {Number} id id of the Country.
 * @apiParam {String} name name of the Country.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "Blonde"
*     }
 * 
 * @apiSuccess {String} _id id of the Country.
 * @apiSuccess {String} name name of the Country.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.country_edit = (req,res,next) => {
    const id = req.params.id;
    Country.update(req.body, {
        where: {
          id: id
        }
    })
    .then(country => {
        res.json({message: `Country ${id} est modifie`});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /countries/delete/:id Delete one country
 * @apiName deleteCountry
 * @apiGroup Country
 * 
 * @apiParam {Number} id id of the Country.
 * 
 * @apiSuccess {String} message Country deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Country deleted"
 *     }
 */
exports.country_delete = (req,res,next) => {
    const id = req.params.id;
    Country.destroy({
        where: {
          id: id
        }
    })
    .then(country => {
        res.json({message: "Country deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}


