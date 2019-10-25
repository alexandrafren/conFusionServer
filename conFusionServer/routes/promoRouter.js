const express = require('express')
const bodyParser = require('body-parser')


const promoRouter = express.Router();

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next();
})
.get((req,res,next) => {
    res.end("Will send all the promotions to you");
})
.post((req, res, next) => {
    res.end("Will add that promotion for you" + req.body.name + req.body.description);
})
.put((req,res,next) => {
    res.end("PUT not supported on promotions")
    res.statusCode = 404;
})
.delete((req,res,next) => {
    res.end("deleting all the promotions")
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end("Will send that promotion to you" + req.params.promoId);
})
.post((req, res, next) => {
    res.end("POST is not supported with a specific promotion");
    res.statusCode = 404;
})
.put((req,res,next) => {
    res.write("Updating that promotion for you " + req.params.promoId)
    res.end("Updated promotion " + req.body.name + req.body.description)
})
.delete((req,res,next) => {
    res.end("I will delete that promotion for you " + req.params.promoId)
});

module.exports = promoRouter;
