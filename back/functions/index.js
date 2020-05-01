const functions = require('firebase-functions');
const express = require('express');
const app = express();

const FBAuth = require('./util/fbAuth');

const {
    getAllReviews,
    postOneReview,
    getReview,
} = require('./handlers/reviews');
const {
    signup,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
} = require('./handlers/users');

//reviews routes
app.get('/reviews', getAllReviews);
app.post('/review', FBAuth, postOneReview);
app.get('/review/:reviewId', getReview);
//TODO delete review
//TODO like review
//TODO unlike review
//TODO comment review

//users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);