const express = require('express');
const app = express();
const PORT = 5000;
const InitiateMongoServer = require('./config/connection');

InitiateMongoServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AuthRoutes = require('./routes/auth');
app.use('/api/users/v1', AuthRoutes);

const PostRoutes = require('./routes/post');
app.use('/api/posts/v1', PostRoutes);

app.listen(PORT, () => console.log('server running on', PORT));