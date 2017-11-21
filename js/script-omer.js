$(window).load(function() {

    function authenticateUser(){
        var userName = $("#username").val();
        var password = $("#password").val();

        var userData = checkUser(userName, password);
        console.log(userData);
    }

});