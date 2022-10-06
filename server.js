require('dotenv').config(); // Activate env variables
const express = require('express');
const path = require('path');
const cors = require('cors');

const indexRouter = require('./src/routes/home.route');
const userRouter = require('./src/routes/users.route');
const authRouter = require('./src/routes/auth.route');
const imageRouter = require('./src/routes/image.route');
const booksRouter = require('./src/routes/books.route');

const app = express();
app.use(cors());

app.use(express.json());
// for parsing application/json

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded

// // for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static('public'));

// // simple route
// app.use('/', indexRouter);
// // app.use("/api/user", userRouter);

// // Image upload routes
// app.use('/api/upImage', imageRouter);

// app.get('/api/upload', (req, res, err) => {
//   // console.log(`🔥 ~ file: server.js ~ line 50 ~ app.get ~ req, res, err`, req, res, err)
//   if (err) throw err;

//   res.send('Done');
// });
// app.get('/api/upload', function (req, res) {
//   res.send('hello world')
// })

app.get('/images/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'UploadFiles/Images'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});
// app.post('/api/upload', upload.single('image'), (req, res, err) => {
//   // if (err) throw err;

//   res.send('hello world')
// });

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
// app.use('/api/check', imageRouter);
app.use('/api/books', booksRouter);

const SERVER_PORT = process.env.SERVER_PORT || 3001;

// set port, listen for requests
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
