const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
};

const isEmpty = (string = '') => {
    return string.trim() === '';
};

exports.validateSignupData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Поле не может быть пустым';
    } else if (!isEmail(data.email)) {
        errors.email = 'Email невалидный или уже занят';
    }

    if (isEmpty(data.password))
        errors.password = 'Поле не может быть пустым';

    if (data.password !== data.confirmPassword)
        errors.confirmPassword = 'Пароли должны совпадать';

    if (isEmpty(data.handle))
        errors.handle = 'Поле не может быть пустым';

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    }
};

exports.validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.email))
        errors.email = 'Поле не может быть пустым';

    if (isEmpty(data.password))
        errors.password = 'Поле не может быть пустым';

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    }
};

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (!isEmpty(data.bio.trim()))
        userDetails.bio = data.bio;
    if (!isEmpty(data.location.trim()))
        userDetails.location = data.location;

    return userDetails;
};