 // This value will be changed when we deploy it to server if we need
var API_ENDPOINT = 'http://localhost:3000/';

function getListings(url){
    console.log('list api called');
    var deferred = new $.Deferred();
    $.ajax({
        url: API_ENDPOINT+'api/listings',
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
    console.log('details api called');
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