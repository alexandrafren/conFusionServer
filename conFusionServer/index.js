const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dishRouter = require('./routes/dishRouter')
const leaderRouter = require('./routes/leaderRouter')
const promoRouter = require('./routes/promoRouter')


const mongoose = require('mongoose');
const Dishes = require('./models/dishes')
const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url)

connect.then((db) => {
    console.log("Connected correctly to server")
}, (err) => { console.log(err); });

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan('dev'))
app.use(bodyParser.json());

function auth(req,res,next) {
    console.log(req.headers);

    var authHeader = req.headers.authorization;

    if (!authHeader){
        var error = new Error('You are not authenticated')
        res.setHeader('WWW-Authenticate', 'Basic')
        err.status = 401;
        return next(err)
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':')
    var username = auth[0];
    var password = auth[1];

    if (username === 'admin' && password === 'password'){
        next();
    }
    else {
        var error = new Error('You are not authenticated')
        res.setHeader('WWW-Authenticate', 'Basic')
        err.status = 401;
        return next(err)
    }
}

app.use(auth)

app.use('/dishes', dishRouter)
app.use('/leaders', leaderRouter)
app.use('/promotions', promoRouter)
app.use(express.static(__dirname+ '/public'))

app.use((req,res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
})

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})