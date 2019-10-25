const express = require('express')
const bodyParser = require('body-parser')


const dishRouter = express.Router();

dishRouter.use(bodyParser.json())

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next();
})
.get((req,res,next) => {
    res.end("Will send all the dishes to you");
})
.post((req, res, next) => {
    res.end("Will add that dish for you" + req.body.name + req.body.description);
})
.put((req,res,next) => {
    res.end("PUT not supported on dishes")
    res.statusCode = 404;
})
.delete((req,res,next) => {
    res.end("deleting all the dishes")
});

dishRouter.route('/:dishId')
.get((req,res,next) => {
    res.end("Will send that dish to you" + req.params.dishId);
})
.post((req, res, next) => {
    res.end("POST is not supported with a specific dish");
    res.statusCode = 404;
})
.put((req,res,next) => {
    res.write("Updating that dish for you " + req.params.dishId)
    res.end("Updated dish " + req.body.name + req.body.description)
})
.delete((req,res,next) => {
    res.end("I will delete that dish for you " + req.params.dishId)
});

module.exports = dishRouter;
