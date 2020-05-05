const functions = require('firebase-functions');
const express = require('express');
const app = express();
const {db} = require('./util/admin');

const FBAuth = require('./util/fbAuth');

const {
    getAllReviews,
    postOneReview,
    getReview,
    commentOnReview,
    likeReview,
    unlikeReview,
    deleteReview,
} = require('./handlers/reviews');

const {
    signup,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead,
} = require('./handlers/users');

//reviews routes
app.get('/reviews', getAllReviews);
app.post('/review', FBAuth, postOneReview);
app.get('/review/:reviewId', getReview);
app.post('/review/:reviewId/comment', FBAuth, commentOnReview);
app.delete('/review/:reviewId', FBAuth, deleteReview);
app.get('/review/:reviewId/like', FBAuth, likeReview);
app.get('/review/:reviewId/unlike', FBAuth, unlikeReview);

//users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
    .onCreate(snapshot => {
        db.doc(`/reviews/${snapshot.data().reviewId}`).get()
            .then(doc => {
                if (doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        read: false,
                        reviewId: doc.id,
                        type: 'like',
                        createdAt: new Date().toISOString(),
                    });
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });

exports.deleteNotificationOnUnLike=functions.firestore.document('likes/{id}')
    .onDelete(snapshot => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .then(()=>{
                return;
            })
            .catch(err=>{
                console.error(err);
                return;
            });

    });

exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
    .onCreate(snapshot => {
        db.doc(`/reviews/${snapshot.data().reviewId}`).get()
            .then(doc => {
                if (doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        read: false,
                        reviewId: doc.id,
                        type: 'comment',
                        createdAt: new Date().toISOString(),
                    });
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });