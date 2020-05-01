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