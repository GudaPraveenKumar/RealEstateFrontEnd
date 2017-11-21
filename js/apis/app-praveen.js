 // This value will be changed when we deploy it to server if we need
var API_ENDPOINT = 'http://localhost:3000/';

function getListings(url){
  
    var deferred = new $.Deferred();
    $.ajax({
        url: '/listings.json',
        method: 'GET',
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

function getListingDetails(userName,password){
    
    var deferred = new $.Deferred();
    $.ajax({
        url: '/listings.json',
        method: 'GET',
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