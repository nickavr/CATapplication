let emptyLocalStorage = function () {
    localStorage.removeItem('currentUser');
};

let getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
};

let userIsLogged = () => {
    let check = false;
    if (localStorage.getItem('currentUser') !== null) {
        check = true;
    }
    return check;
};

let getUserStatus = () => {
    let statusArray = JSON.parse(localStorage.getItem('currentUser')).userRoles;
    //setTimeout(() => (statusArray = currentUser.userRoles), 300);
    return statusArray;
};

module.exports = {
    emptyLocalStorage,
    getUserFromStorage,
    userIsLogged,
    getUserStatus,
};
