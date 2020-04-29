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

//get all reviews
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
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                });
            });
            return res.json(reviews);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
});

const FBAuth = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('Token не найден');
        return res.status(403).json({error: 'Пользователь не зарегистрирован'});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            console.log(decodedToken);
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error('Ошибка при проверке token', err);
            return res.status(403).json(err);
        });
};

//post one review
app.post('/review', FBAuth, (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({body: 'Поле не может быть пустым'});
    }

    const newReview = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString(),
    };

    db
        .collection('reviews')
        .add(newReview)
        .then(doc => {
            res.json({message: `Документ ${doc.id} создан`});
        })
        .catch(err => {
            res.status(500).json({error: 'Что-то пошло не так'});
            console.error(err);
        });

});

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
};

const isEmpty = (string) => {
    return string.trim() === '';
};

//signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    let errors = {};

    if (isEmpty(newUser.email)) {
        errors.email = 'Поле не может быть пустым';
    } else if (!isEmail(newUser.email)) {
        errors.email = 'Email невалидный или уже занят';
    }

    if (isEmpty(newUser.password))
        errors.password = 'Поле не может быть пустым';

    if (newUser.password !== newUser.confirmPassword)
        errors.confirmPassword = 'Пароли должны совпадать';

    if (isEmpty(newUser.handle))
        errors.handle = 'Поле не может быть пустым';

    if (Object.keys(errors).length > 0)
        return res.status(400).json(errors);
    //TODO validate data

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists) { //уникальное имя
                return res.status(400).json({handle: 'Это имя уже занято'});
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({token});
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({email: 'Email уже занят'});
            } else {
                return res.status(500).json({error: err.code});
            }
        })
});

//login route
app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    let errors = {};

    if (isEmpty(user.email))
        errors.email = 'Поле не может быть пустым';
    if (isEmpty(user.password))
        errors.password = 'Поле не может быть пустым';
    if (Object.keys(errors).length > 0)
        return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({token});
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                return res.status(403).json({general: 'Неверный email или пароль'});
            } else
                return res.status(500).json({error: err.code});
        });
});
exports.api = functions.https.onRequest(app);