var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
var logger = require('morgan');
const mongoose = require('mongoose');
const unless = require('express-unless')
const auth = require('./helpers/jwt')
const errors = require('./helpers/error_handler.js')

// Connection to MongoDB Atlas.
mongoose.connect('mongodb+srv://Admin:Admin0000@cluster0.y1k51.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messageRouter = require('./routes/messages');
var convRouter = require('./routes/conv');

var app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on('chat message', (msg) => {    
    io.emit('chat message', msg);  
    });
  console.log('someone use a socket');
});

httpServer.listen(3000);

// middleware for authenticating token submitted with requests
auth.authenticateToken.unless = unless
app.use(auth.authenticateToken.unless({
    path: [
        { url: '/users/login', methods: ['POST']},
        { url: '/users/register', methods: ['POST']},
        { url: '/users/all', methods: ['GET']},
        { url: '/users/alone', methods: ['GET']},
        { url: '/users/me', methods: ['GET']},
        { url: '/messages/addMessage', methods: ['POST']},
        { url: '/conv/create', methods: ['POST']},
        { url: '/conv/all', methods: ['GET']},
        // { url: '/users/:id', methods: ['GET']},

    ]
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errors.errorHandler); // catch and show Errors.

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messageRouter);
app.use('/conv', convRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err});
});

module.exports = app;
