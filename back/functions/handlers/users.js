const {admin, db} = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {validateSignupData, validateLoginData,} = require('../util/validators');

//Sing user up
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
        isSitter: req.body.isSitter, //TODO
    };

    const {valid, errors} = validateSignupData(newUser);

    if (!valid)
        return res.status(400).json(errors);

    const noImg = 'no-img.png';

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
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId,
                isSitter: newUser.isSitter, //TODO
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
                return res.status(500).json({general: 'Что-то пошло не так'});
            }
        })
};

//Log user in
exports.login = (req, res) => {
    const user = req.body;

    const {valid, errors} = validateLoginData(user);

    if (!valid)
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
            //auth/wrong-password
            //auth/user-not-found
            return res.status(403).json({general: 'Неверный email или пароль'});
        });
};

//Add user details
exports.addUserDetails = (req, res) => {
    db.doc(`/users/${req.user.handle}`).update(req.body)
        .then(() => {
            return res.json({message: 'Описание обновлено'});
        })
        .catch(err => {
            console.error(err);
            return res.status(400).json({error: err.code});
        })
};

//Get any user's details
exports.getUserDetails = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.params.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                userData.user = doc.data();
                return db.collection('reviews')
                    .where('recipientHandle', '==', req.params.handle)
                    .orderBy('createdAt', 'desc')
                    .get();
            } else {
                return res.status(404).json({error: 'Пользователь не найден'});
            }
        })
        .then(data => {
            userData.reviews = [];
            data.forEach(doc => {
                userData.reviews.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    reviewId: doc.id,
                });
            });
            return res.json(userData);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
};

//Get own user details
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db
                    .collection('likes')
                    .where('userHandle', '==', req.user.handle)
                    .get();
            }
        })
        .then(data => {
            userData.likes = [];
            data.forEach(doc => {
                userData.likes.push(doc.data());
            });
            return db.collection('notifications')
                .where('recipient', '==', req.user.handle)
                .orderBy('createdAt', 'desc')
                .get();
        })
        .then(data => {
            userData.notifications = []; //TODO
            data.forEach(doc => {
                userData.notifications.push({ //TODO
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    read: doc.data().read,
                    reviewId: doc.data().reviewId,
                    reviewHandle: doc.data().reviewHandle,
                    type: doc.data().type,
                    createdAt: doc.data().createdAt,
                    notificationId: doc.id
                })
            });
            return db.collection('notifications')
                .where('reviewHandle', '==', req.user.handle)
                .orderBy('createdAt', 'desc')
                .get()
                .then((snapshot) => {
                    return snapshot.docs.filter((notification) =>
                        notification.data().reviewHandle !== notification.data().sender
                    );
                });
        })
        .then(data => {
            data.forEach(doc => {
                userData.notifications.push({ //TODO
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    read: doc.data().read,
                    reviewId: doc.data().reviewId,
                    reviewHandle: doc.data().reviewHandle,
                    type: doc.data().type,
                    createdAt: doc.data().createdAt,
                    notificationId: doc.id
                })
            });
            return res.json(userData);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
};

//Upload a profile image for user
exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({headers: req.headers});

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({error: 'Неверный тип файла'});
        }

        //my.image.png
        const filenameSplit = filename.split('.');
        const imageExtension = filenameSplit[filenameSplit.length - 1];
        //82416274245722.png
        imageFileName = `${Math.round(Math.random() * 1000000000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = {
            filepath,
            mimetype,
        };
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                return db.doc(`/users/${req.user.handle}`).update({imageUrl});
            })

            .then(() => {
                return res.json({message: 'Изображение загружено'});
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({error: err.code});
            })
    });
    busboy.end(req.rawBody);
};

exports.markNotificationsRead = (req, res) => {
    let batch = db.batch();
    req.body.forEach(notificationId => {
        const notification = db.doc(`/notifications/${notificationId}`);
        batch.update(notification, {read: true});
    });
    batch.commit()
        .then(() => {
            return res.json({message: 'Уведомление прочитано'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
};

exports.getAllLocations = (req, res) => {
    db
        .collection('locations')
        .get()
        .then(data => {
            const locations = [];
            data.forEach(doc => {
                const data = doc.data();
                for (const city in data) {
                    locations.push(
                        {
                            name: data[city],
                            apiName: city,
                        });
                }
            });
            return res.json(locations);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
};

exports.getAllSittersForCity = (req, res) => {
    db
        .collection('users')
        .orderBy('createdAt', 'desc')
        .where('location', '==', req.params.location)
        .where('isSitter', '==', true)
        .get()
        .then(data => {
            let sitters = [];
            data.forEach(doc => {
                sitters.push({
                    bio: doc.data().bio,
                    createdAt: doc.data().createdAt,
                    handle: doc.data().handle,
                    imageUrl: doc.data().imageUrl,
                    isSitter: doc.data().isSitter,
                    location: doc.data().location,
                });
            });
            return res.json(sitters);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });

};

exports.getAllSitters = (req, res) => {
    db
        .collection('users')
        .orderBy('createdAt', 'desc')
        .where('isSitter', '==', true)
        .get()
        .then(data => {
            let sitters = [];
            data.forEach(doc => {
                sitters.push({
                    bio: doc.data().bio,
                    createdAt: doc.data().createdAt,
                    handle: doc.data().handle,
                    imageUrl: doc.data().imageUrl,
                    isSitter: doc.data().isSitter,
                    location: doc.data().location,
                });
            });
            return res.json(sitters);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
};