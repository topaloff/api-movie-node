const Movie = require('../models/').Movie;

/**
 * @api {get} /movies Show all movies
 * @apiName getMovies
 * @apiGroup Movie
 * @apiSuccess {String} _id id of the Movie.
 * @apiSuccess {String} name name of the Movie.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "name": "Blonde"
 *     }]
 */
exports.movie_list = (req,res,next)=>{
    Movie.findAll({})
    .then(movies => {
        res.json(movies);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 *  * @api {get} /movies/:id Show detail of one movie
 * @apiName getMoviesDetail
 * @apiGroup Movie
 * 
 * @apiParam {Number} id of the Movie
 * 
 * @apiSuccess {String} _id id of the Movie.
 * @apiSuccess {String} name name of the Movie.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.movie_detail = (req,res,next)=>{
    const id = req.params.id
    Movie.findByPk(id)
    .then(movie => {
        res.json(movie);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {post} /movies/add Add one movie
 * @apiName addMovie
 * @apiGroup Movie
 * 
 * @apiParam {String} name name of the Movie.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "France"
*     }
 * 
 * @apiSuccess {String} _id id of the Movie.
 * @apiSuccess {String} name name of the Movie.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "France",
 *       "updatedAt": "2020-03-17T15:26:58.984Z",
 *       "createdAt": "2020-03-17T15:26:58.984Z"
 *     }
 */
exports.movie_add = (req,res,next) => {
    Movie.create(req.body)
    .then(movie => {
        res.json(movie);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {put} /movies/edit/:id Edit one movie
 * @apiName editMovie
 * @apiGroup Movie
 * 
 * @apiParam {Number} id id of the Movie.
 * @apiParam {String} name name of the Movie.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "Blonde"
*     }
 * 
 * @apiSuccess {String} _id id of the Movie.
 * @apiSuccess {String} name name of the Movie.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Blonde"
 *     }
 */
exports.movie_edit = (req,res,next) => {
    const id = req.params.id;
    Movie.update(req.body, {
        where: {
          id: id
        }
    })
    .then(movie => {
        res.json({message: `Movie ${id} est modifie`});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /movies/delete/:id Delete one movie
 * @apiName deleteMovie
 * @apiGroup Movie
 * 
 * @apiParam {Number} id id of the Movie.
 * 
 * @apiSuccess {String} message Movie deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Movie deleted"
 *     }
 */
exports.movie_delete = (req,res,next) => {
    const id = req.params.id;
    Movie.destroy({
        where: {
          id: id
        }
    })
    .then(movie => {
        res.json({message: "Movie deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}


