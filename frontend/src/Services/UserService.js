let emptyLocalStorage = function () {
    localStorage.removeItem('currentUser');
};

let getUserFromStorage = () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
};

let userIsLogged = () => {
    let check = false;
    if (localStorage.getItem('currentUser') !== null) {
        check = true;
    }
    return check;
};

module.exports = {
    emptyLocalStorage,
    getUserFromStorage,
    userIsLogged,
};
