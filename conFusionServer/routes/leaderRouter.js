const express = require('express')
const bodyParser = require('body-parser')


const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next();
})
.get((req,res,next) => {
    res.end("Will send all the leaders to you");
})
.post((req, res, next) => {
    res.end("Will add that leader for you" + req.body.name + req.body.description);
})
.put((req,res,next) => {
    res.end("PUT not supported on leaders")
    res.statusCode = 404;
})
.delete((req,res,next) => {
    res.end("deleting all the leaders")
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    res.end("Will send that leader to you" + req.params.leaderId);
})
.post((req, res, next) => {
    res.end("POST is not supported with a specific leader");
    res.statusCode = 404;
})
.put((req,res,next) => {
    res.write("Updating that leader for you " + req.params.leaderId)
    res.end("Updated leader " + req.body.name + req.body.description)
})
.delete((req,res,next) => {
    res.end("I will delete that leader for you " + req.params.leaderId)
});

module.exports = leaderRouter;
