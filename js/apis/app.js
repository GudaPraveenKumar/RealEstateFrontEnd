// This value will be changed when we deploy it to server if we need
var API_ENDPOINT = 'http://localhost:3000/';

function checkUser(userName,password){
    var _data = { username : userName, password : password };
    var deferred = new $.Deferred();
    $.ajax({
        url: API_ENDPOINT+'api/login',
        method: 'POST',
        data: JSON.stringify(_data),
        dataType: "json",
        contentType: 'application/json',
        success: function (response) {
            deferred.resolve(response);
        },
        error: function (response){
            deferred.reject(response);
        }
    });
    return deferred.promise();  
};