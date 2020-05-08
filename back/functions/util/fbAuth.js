const {admin, db} = require('./admin');

module.exports = (req, res, next) => {
    let idToken;
    if (req.headers.login && req.headers.login.startsWith('Bearer ')) {
        idToken = req.headers.login.split('Bearer ')[1];
    } else {
        console.error('Token не найден');
        return res.status(403).json({error: 'Пользователь не зарегистрирован'});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            req.user.imageUrl=data.docs[0].data().imageUrl;
            return next();
        })
        .catch(err => {
            console.error('Ошибка при проверке token', err);
            return res.status(403).json(err);
        });
};