const Movie = require('../models/').Movie;
const Category = require('../models/').Category;
const Actor = require('../models/').Actor;
const MovieActor = require('../models/').MovieActor;
const uuidv4 = require("uuid/v4");

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
    Movie.findAll({
        attributes: ['id','title','description','picture','year','note'], //Choose which fields to show
        include: [
            {
                model: Actor,
                attributes: ['id','name','firstname','birth','picture']
            }   
        ],
        order: [['title', 'ASC']]
    })
    .then(movies => {
        MovieActor.findAll({

        })
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
    // Movie.findByPk(id)
    // .then(movie => {
    //     res.json(movie);
    // })
    // .catch(error=>{
    //     res.status(400);
    //     res.json({message : 'il y a rien la'});
    // })
    Movie.findAll({
        where: { id: id },
        include: {
          model: Actor,
          through: { attributes: [] } // this will remove the rows from the join table (i.e. 'UserPubCrawl table') in the result set
        }
      })
      .then(movie => {
            res.json(movie[0]);
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
    if (req.file) {
        console.log('Uploading file...');
        var filename = 'uploads/movies/'+req.file.filename;
    } else {
        console.log('No File Uploaded');
        var filename = '';
    }
    Movie.create({
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        note: req.body.note,
        year: req.body.year,
        CategoryId: req.body.CategoryId,
    })
    .then(movie => {
        const id = movie.id;
        Movie.update({"picture":filename}, {
            where: {
              id: id
            }
        })
        .then(data => {
            res.json(movie);
        })
        .catch(error=>{
            res.status(400);
            res.json(error);
        })
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
    if (req.file) {
        console.log('Uploading file...');
        var filename = 'uploads/movies/'+req.file.filename;
    } else {
        console.log('No File Uploaded');
        var filename = '';
    }
    Movie.update(req.body, {
        where: {
          id: id
        }
    })
    .then(movie => {
        if (req.file) {
            Movie.update({"picture":filename}, {
                where: {
                id: id
                }
            })
            .then(data => {
                res.json({message: `Movie ${id} est modifie`});
            })
            .catch(error=>{
                res.status(400);
                res.json(error);
            })
        }
        else{
            res.json({message: `Movie ${id} est modifie`});
        }
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

/**
 * @api {ActorMovie} /movies/actor/:id Add actor to a movie
 * @apiName addActor
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
exports.movie_add_actor = (req, res, next) => {
    const id = req.params.id;
    console.log(req.body.actorId)   
    Movie.findByPk(id)
    .then(movie => {
        movie.setActors(req.body.actorId)
        .then(data => res.json('ok'))
        .catch(error=>{
            res.status(400);
            res.json(error);
        })
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

