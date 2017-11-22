function getUserInfo(){
    var retrievedObject = localStorage.getItem('userInfo');
    return retrievedObject != null ? JSON.parse(retrievedObject) : null;
}

function logOutUser(){
    localStorage.clear();
    window.location.href = "/html/home.html";
}