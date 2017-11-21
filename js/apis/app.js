function checkUser(userName,password){

    var _data = { username : userName, password : password };

    var saveData = $.ajax({
        type: 'POST',
        url: "http://localhost:3000/api/login",
        dataType: "json",
        data: JSON.stringify(_data),
        contentType: 'application/json',
        success: function(resultData) {
            console.log("Success");
            console.log(resultData);
            return resultData;
        },
        error: function (error) {
            console.log("Error: " + error);
            return error;
        }
    });
}