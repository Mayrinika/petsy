const {db} = require('../util/admin');

exports.getAllReviews = (req, res) => {
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
};

exports.postOneReview = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({body: 'Поле не может быть пустым'});
    }

    const newReview = {
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
    };

    db
        .collection('reviews')
        .add(newReview)
        .then(doc => {
            const resReview = newReview;
            resReview.reviewId = doc.id;
            res.json(resReview);
        })
        .catch(err => {
            res.status(500).json({error: 'Что-то пошло не так'});
            console.error(err);
        });

};

//Fetch one review
exports.getReview = (req, res) => {
    let reviewData = {};
    db
        .doc(`/reviews/${req.params.reviewId}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({error: 'Отзыв не найден'});
            }
            reviewData = doc.data();
            reviewData.reviewId = doc.id;
            return db
                .collection('comments')
                .orderBy('createdAt', 'desc')
                .where('reviewId', '==', req.params.reviewId)
                .get();
        })
        .then(data => {
            reviewData.comments = [];
            data.forEach(doc => {
                reviewData.comments.push(doc.data());
            });
            return res.json(reviewData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
};

//Comment on a review
exports.commentOnReview = (req, res) => {
    if (req.body.body.trim() === '')
        return res.status(400).json({error: 'Поле не может быть пустым'});

    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        reviewId: req.params.reviewId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
    };

    db
        .doc(`/reviews/${req.params.reviewId}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({error: 'Отзыв не найден'});
            }
            return db
                .collection('comments')
                .add(newComment);
        })
        .then(() => {
            res.json(newComment);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Что-то пошло не так'});
        });
};

//Like a review
exports.likeReview = (req, res) => {
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.handle)
        .where('reviewId', '==', req.params.reviewId)
        .limit(1);

    const reviewDocument = db.doc(`/reviews/${req.params.reviewId}`);

    let reviewData;

    reviewDocument
        .get()
        .then(doc => {
            if (doc.exists) {
                reviewData = doc.data();
                reviewData.reviewId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({error: 'Отзыв не найден'});
            }
        })
        .then(data => {
            if (data.empty) {
                return db.collection('likes').add({
                    reviewId: req.params.reviewId,
                    userHandle: req.user.handle
                })
                    .then(() => {
                        reviewData.likeCount++;
                        return reviewDocument.update({likeCount: reviewData.likeCount});
                    })
                    .then(() => {
                        return res.json(reviewData);
                    })
            } else {
                return res.status(400).json({error: 'Вы уже оценили'});
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
};

exports.unlikeReview = (req, res) => {
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.handle)
        .where('reviewId', '==', req.params.reviewId)
        .limit(1);

    const reviewDocument = db
        .doc(`/reviews/${req.params.reviewId}`);

    let reviewData;

    reviewDocument
        .get()
        .then(doc => {
            if (doc.exists) {
                reviewData = doc.data();
                reviewData.reviewId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({error: 'Отзыв не найден'});
            }
        })
        .then(data => {
            if (data.empty) {
                return res.status(400).json({error: 'Отзыв не оценен'});
            } else {
                return db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        reviewData.likeCount--;
                        return reviewDocument.update({likeCount: reviewData.likeCount});
                    })
                    .then(() => {
                        res.json(reviewData);
                    })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
};
