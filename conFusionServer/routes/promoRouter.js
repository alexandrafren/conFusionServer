const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Promotions = require('../models/promotions')
const promoRouter = express.Router();

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next();
})
.get((req,res,next) => {
    Promotions.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Promotion Created ', promo)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res,next) => {
    res.end("PUT not supported on promotions")
    res.statusCode = 404;
})
.delete((req,res,next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promotionId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    res.end("POST is not supported with a specific promotion");
    res.statusCode = 404;
})
.put((req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
});

module.exports = promoRouter;
