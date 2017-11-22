$(document).ready(function() {

});

$("#logout").click(function(){
    logOutUser();
});

function setNavLinks(){
    var userInfo = getUserInfo();
    if(userInfo != null){
        $("#login-link").css("display","none");
        $("#signup-link").css("display","none");
        $("#profile-link").css("display","inline-block");
        $("#messages-link").css("display","inline-block");
        $("#logout-link").css("display","inline-block");
    }
    else{
        $("#login-link").css("display","inline-block");
        $("#signup-link").css("display","inline-block");
        $("#profile-link").css("display","none");
        $("#messages-link").css("display","none");
        $("#logout-link").css("display","none");
    }
}

function authenticateUser(){
    $("#error-msg").text("");
    var userName = $("#username").val();
    var password = $("#password").val();

    checkUser(userName, password).then(function(data){
        console.log(data);
        var response = data;
        if(response.success){
            localStorage.setItem('userInfo', response.data);
            window.location.href = "/html/home.html";
        }
        else{
            $("#error-msg").text(response.message);
        }
    });
}

function signUpUser(){
    $("#error-msg").text("");

    var firstName = $("#firstname").val();
    var lastName = $("#lastname").val();
    var email = $("#email").val();
    var mobile = $("#mobilenumber").val();
    var userName = $("#username").val();
    var password = $("#password").val();
    var confirmPass = $("#confirm-password").val();

    registerUser(firstName,lastName,email,mobile, userName, password, confirmPass).then(function(data){
        console.log(data);
        var response = data;
        if(response.success){
            localStorage.setItem('userInfo', response.data);
            window.location.href = "/html/home.html";
        }
        else{
            $("#error-msg").text(response.message);
        }


    });
}