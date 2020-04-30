const functions = require('firebase-functions');
const express = require('express');
const app = express();

const FBAuth = require('./util/fbAuth');

const {getAllReviews, postOneReview} = require('./handlers/reviews');
const {signup, login} = require('./handlers/users');

//reviews routes
app.get('/reviews', getAllReviews);
app.post('/review', FBAuth, postOneReview);

//users routes
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.https.onRequest(app);