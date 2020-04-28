const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/reviews', (req, res) => {
    admin
        .firestore()
        .collection('reviews')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let reviews = [];
            data.forEach(doc => {
                reviews.push({
                    reviewId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                });
            });
            return res.json(reviews);
        })
        .catch(err => console.error(err));
});

app.post('/review', (req, res) => {
    const newReview = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString(),
    };

    admin
        .firestore()
        .collection('reviews')
        .add(newReview)
        .then(doc => {
            res.json({message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        })

});

exports.api = functions.https.onRequest(app);