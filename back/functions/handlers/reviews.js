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

exports.postOneReview=(req, res) => {
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