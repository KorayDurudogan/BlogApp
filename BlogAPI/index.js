const express = require('express');
const app = express();
const TokenAuthentication = require('./request-handler');
var cors = require('cors')

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/api/auth', require('./controllers/auth-controller').router);
app.use('/api/users', TokenAuthentication, require('./controllers/users-controller').router);
app.use('/api/posts', TokenAuthentication, require('./controllers/posts-controller').router);

app.listen(1453, function () {
  console.log('BlogAPI started successfully..');
});