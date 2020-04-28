const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.getReviews = functions.https.onRequest((req, res) => {
    admin
        .firestore()
        .collection('reviews')
        .get()
        .then(data => {
            let reviews = [];
            data.forEach(doc => {
                reviews.push(doc.data());
            });
            return res.json(reviews);
        })
        .catch(err => console.error(err));
});

exports.createReview = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({error: 'Method non allowed'});
    }
    const newReview = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
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