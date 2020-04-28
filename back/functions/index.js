const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

admin.initializeApp();

const config = {
    apiKey: "AIzaSyBmwoHGxVZgC-uxhyLDQFKjYVEUTDBuzdQ",
    authDomain: "petsy-405d6.firebaseapp.com",
    databaseURL: "https://petsy-405d6.firebaseio.com",
    projectId: "petsy-405d6",
    storageBucket: "petsy-405d6.appspot.com",
    messagingSenderId: "716665086488",
    appId: "1:716665086488:web:6dbc4b7461881e6e16596d"
};

const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

app.get('/reviews', (req, res) => {
    db
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

    db
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

//signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    //TODO validate data

    let token,userId;
    db.doc(`/users/${newUser.handle}`).get() //уникальное имя
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({handle: 'this handle is already taken'});
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId=data.user.uid;
            return data.user.getIdToken();
        })
        .then(tok => {
            token=tok;
            const userCredentials={
                handle:newUser.handle,
                email:newUser.email,
                createdAt:new Date().toISOString(),
                userId,
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(()=>{
            return res.status(201).json({token});
        })
        .catch(err => {
            console.error(err);
            if(err.code==='auth/email-already-in-use') {
                return res.status(400).json({email:'Email is already use'});
            } else {
                return res.status(500).json({error: err.code});
            }
        })
});
exports.api = functions.https.onRequest(app);