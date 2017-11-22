function getUserInfo(){
    return localStorage.getItem('userInfo');
}

function logOutUser(){
    localStorage.clear();
    window.location.href = "/html/home.html";
}