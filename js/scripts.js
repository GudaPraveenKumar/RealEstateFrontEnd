$(window).load(function() {

    var oldLocation = document.referrer;
    var newLocation = '';
    var hash = '';
    var apiCalled = false;

    if(location.pathname == '/index.html'){
        window.location.href = location.origin+'/html/home.html'
    }

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

        })
        $( "#footer-content" ).load( "partials/_footer.html", function() {

        });


        $("#body-content").load("partials/_homeBody.html", function(){
            $('.search_button').click(function(){
                var searchText = $('.searchBox').val();
                searchListings(searchText);

            })
        });
    }

    loadHomePage();

    function searchListings(searchVal){

        var url = window.location.href;
        window.location.hash = '?search='+searchVal;
        apiCalled = true;
        getListings('/listings.json').then(function(response){
            console.log('response = = = = ',response);
            $('#body-content').load("partials/_listings.html", function(){
                for(var i=0; i < 6; i++){
                    var template = $('#listingCard').clone();
                    var searchIdx = "listingCard"+i;
                    template.attr('style',"padding:0px 10px");
                    template.attr('style',"display:block;");
                    template.attr('id',"searchIdx");
                    template.attr('data',response[0].ID);
                    template.find(".listing-price")[0].innerHTML = response[0].Price;
                    template.find(".listing-title")[0].innerHTML = "<div id=listing-"+i+" class'view-listing-details' data="+response[0].ID+">2BHK flat</div>";
                    template.find(".listing-description")[0].innerHTML = response[0].AdDescription;
                    template.find(".mask")[0].innerHTML = "<img id=listing-image-"+i+" class='listing-image img-responsive view-listing-details' src='/images/pc1.jpg' data="+response[0].ID+" alt=''>"
                    var exe = template.find(".mask")[0];
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
        console.log('details api called');
        apiCalled = true;
        var url = window.location.href;
        window.location.hash = '?listingId='+val;

        getListingDetails(val).then(function(response){
            console.log(response);
            $('#body-content').load("partials/_single.html", function(){
                apiCalled = false;
            });
        })
        
    };

});


