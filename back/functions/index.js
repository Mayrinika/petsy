const functions = require('firebase-functions');
const express = require('express');
const app = express();
const {db} = require('./util/admin');

const FBAuth = require('./util/fbAuth');

const {
    getAllReviews,
    getAllReviewsForUser,
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
    getAllLocations,
    getAllSittersForCity,
    getAllSitters,
} = require('./handlers/users');

//Reviews routes
app.get('/reviews', getAllReviews);
app.get('/reviews/:recipientHandle', getAllReviewsForUser); //
app.post('/review', FBAuth, postOneReview); //
app.get('/review/:reviewId', getReview); //
app.post('/review/:reviewId/comment', FBAuth, commentOnReview); //
app.delete('/review/:reviewId', FBAuth, deleteReview); //
app.get('/review/:reviewId/like', FBAuth, likeReview); //
app.get('/review/:reviewId/unlike', FBAuth, unlikeReview); //

//users routes
app.post('/signup', signup); //
app.post('/login', login); //
app.post('/user/image', FBAuth, uploadImage); //
app.post('/user', FBAuth, addUserDetails); //
app.get('/user', FBAuth, getAuthenticatedUser); //
app.get('/user/:handle', getUserDetails); //
app.post('/notifications', FBAuth, markNotificationsRead); //?

app.get('/locations', getAllLocations); //
app.get('/sitters/:location', getAllSittersForCity); //TODO ситтеры по городу //
app.get('/sitters', getAllSitters); //


exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
    .onCreate(snapshot => {
        return db.doc(`/reviews/${snapshot.data().reviewId}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        read: false,
                        reviewId: doc.id,
                        reviewHandle: doc.data().recipientHandle,
                        type: 'like',
                        createdAt: new Date().toISOString(),
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    });

exports.deleteNotificationOnUnLike = functions.firestore.document('likes/{id}')
    .onDelete(snapshot => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch(err => {
                console.error(err);
                return;
            });

    });

exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
    .onCreate(snapshot => {
        return db.doc(`/reviews/${snapshot.data().reviewId}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        read: false,
                        reviewId: doc.id,
                        reviewHandle: doc.data().recipientHandle,
                        type: 'comment',
                        createdAt: new Date().toISOString(),
                    });
                }
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });

exports.onUserImageChange = functions.firestore.document('/users/{userId}')
    .onUpdate((change) => {
        console.log(change.before.data());
        console.log(change.after.data());
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            console.log('Изображение изменено');
            const batch = db.batch();
            return db.collection('reviews')
                .where('userHandle', '==', change.before.data().handle).get()
                .then((data) => {
                    data.forEach(doc => {
                        const review = db.doc(`/reviews/${doc.id}`);
                        batch.update(review, {userImage: change.after.data().imageUrl});
                    });
                    return batch.commit();
                })
        } else {
            return true;
        }
    });

exports.onReviewDelete = functions.firestore.document('/reviews/{reviewId}')
    .onDelete((snapshot, context) => {
        const reviewId = context.params.reviewId;
        const batch = db.batch();
        return db
            .collection('comments')
            .where('reviewId', '==', reviewId)
            .get()
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                });
                return db
                    .collection('likes')
                    .where('reviewId', '==', reviewId)
                    .get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                });
                return db
                    .collection('notifications')
                    .where('reviewId', '==', reviewId)
                    .get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch(err => {
                console.error(err);
            })
    });