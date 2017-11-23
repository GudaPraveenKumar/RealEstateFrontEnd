$(window).load(function() {

    var oldLocation = document.referrer;
    var newLocation = '';
    var hash = '';
    var apiCalled = false;

    if(location.pathname == '/index.html'){
        window.location.href = location.origin+'/html/home.html'
    }
    if(location.pathname == ''){
        window.location.href = location.origin+'/html/home.html'
    }
     $( "#header-content" ).load( "partials/_header.html", function() {
        
            window.scrollTo(0, 0);
            setNavLinks();
        });

      $( "#footer-content" ).load( "partials/_footer.html", function() {

        });

    $(window).on('hashchange', function(){
        newLocation = window.location.href;
        
        if(location.hash){
            
            hash = location.hash.substring(2);
            
            // var params = hash.split('&');
           
            switch(true){
                case(hash.indexOf('search') == '0'):
                    
                    if(!apiCalled){
                         searchListings('');
                    }
                    break;
                case(hash.indexOf('listingId') == '0'):
                    
                    if(!apiCalled){

                    listingDetails(hash.split('=')[1]);
                    }
                   
                    break;
                default:
                    console.log('home');
                    $("#body-content").load("partials/_homeBody.html", function(){
                    });
            };
        }else if(location.pathname == '/html/home.html'){
          loadHomePage();
            
        }
    }).trigger('hashchange'); 

    function loadHomePage(){
        $( "#header-content" ).load( "partials/_header.html", function() {
        
            window.scrollTo(0, 0);
            setNavLinks();
        });

        $("#search-content").load("partials/_search.html", function(){
            $('.search_button').click(function(){

                var searchTxt = $('.searchBox').val();
                type = $('#ddType').val(),
                brooms = $('#ddBedroom').val(),
                sqft = $('#txtSqft').val(),
                budget = $('#ddBudget').val();

                var url = ((searchTxt)?'&search='+ searchTxt:'')+((type)?'&type='+ type:'')+((brooms)?'&brooms='+ brooms:'')
                            +((sqft)?'&sqft='+ sqft:'')+((budget)?'&budget='+ budget:'');
                    if(url){
                        url = '?'+url.substring(1);
                    }
                    
                
                searchListings(url);

            })
        })
        $( "#footer-content" ).load( "partials/_footer.html", function() {

        });

        $("#body-content").load("partials/_homeBody.html", function(){
            
            searchListings('');
        });
    }

    function searchListings(searchString){
        document.getElementById("search-content").style.display = "block";
        console.log('url = = = = = ',searchString);
        var url = window.location.href;
        window.location.hash = ''+searchString;
        apiCalled = true;
        getListings(searchString).then(function(response){
            
            $('#body-content').load("partials/_listings.html", function(){
                    
                for(var i=0; i < response.length; i++){
                    var template = $('#listingCard').clone();
                    template.attr('style',"display:block;");
                    
                    template.find(".listing-title")[0].innerHTML = "<div id=listing-"+i+" class='view-listing-details' data="+response[i].ID+">2BHK flat</div>";
                    template.find(".realEstateBed")[0].innerHTML = response[i].BedRooms;
                    if(response[i].AdTypeId == 1){
                        template.find(".realEstateType")[0].innerHTML = "Apartment";
                    }else if(response[i].AdTypeId == 2){
                        template.find(".realEstateType")[0].innerHTML = "House";
                    }else{
                        template.find(".realEstateType")[0].innerHTML = "Not specified";
                    }
                    template.find(".realEstateBath")[0].innerHTML = response[i].BathRooms;
                    template.find(".realEstateArea")[0].innerHTML = response[i].SquareFeet;
                    template.find(".realEstateArea")[0].innerHTML = response[i].SquareFeet;
                    if(response[i].Parking == 1){
                        template.find(".realEstateParking")[0].innerHTML = "Yes"
                    }else{
                        template.find(".realEstateParking")[0].innerHTML = "No"
                    }
                    template.find(".realEstateCity")[0].innerHTML = response[i].City;
                    template.find(".realEstateState")[0].innerHTML = response[i].State;
                    template.find(".realEstateZip")[0].innerHTML = response[i].Zip;
                   

                    template.find(".adImage")[0].innerHTML = "<img id=listing-image-"+i+" class='listing-image view-listing-details' src='/images/pc1.jpg' data="+response[i].ID+" alt=''> <span class='four listing-price'>$"+response[i].Price+"</span>";
                    var exe = template.find(".adImage")[0];
                
                    // after adding all details appending the template
                    template.appendTo(".appendHere");
                }

                var listingDetailsLinks = document.getElementsByClassName("view-listing-details");
    
                for(var i=0;i < listingDetailsLinks.length;i++) {
                    listingDetailsLinks[i].addEventListener("click", function() {
                        var element = document.getElementById(this.id);
                        var idx = element.getAttribute("data");
                        listingDetails(idx);
                    });
                };
                apiCalled = false;
            });
        });
        
    };

    function listingDetails(val){
        
        apiCalled = true;
        var url = window.location.href;
        window.location.hash = '?listingId='+val;

        getListingDetails(val).then(function(response){
            console.log(response);
            document.getElementById("search-content").style.display = "none";
            // $("#search-content").style.display = "none";
            $('#body-content').load("partials/_single.html", function(){
               
            });
        })
        
    };

});


