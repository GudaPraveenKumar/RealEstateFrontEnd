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

                    getListingDetails(hash.split('=')[1]);
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
        //$('html, body').animate({scrollTop: '0px'}, 300);
            window.scrollTo(0, 0);
        });
        $( "#footer-content" ).load( "partials/_footer.html", function() {
        
        });

        $("#body-content").load("partials/_homeBody.html", function(){
            $('.search_button').click(function(){
                var searchText = $('.searchBox').val();
                var url = window.location.href;
                window.location.hash = '?search='+searchText;
                
                searchListings(searchText);

            })
        });
    }

    loadHomePage();

    function searchListings(data){
        apiCalled = true;
        console.log('params',data);
        $.ajax({url: "/listings.json", success: function(response){
            console.log('list api called');
            $('#body-content').load("partials/_listings.html", function(){
                for(var i=0; i < response.length; i++){
                    var template = $('#listingCard').clone();
                    var searchIdx = "listingCard"+i;
                    template.attr('style',"padding:0px 10px");
                    template.attr('style',"display:block;");
                    template.attr('id',"searchIdx");
                    template.attr('data',response[i].id);
                    template.find(".listing-price")[0].innerHTML = response[i].price;
                    template.find(".listing-title")[0].innerHTML = "<div id=listing-"+i+" class'view-listing-details' data="+response[i].id+">"+response[i].name+"</div>";
                    template.find(".listing-description")[0].innerHTML = response[i].description;
                    template.find(".mask")[0].innerHTML = "<img id=listing-image-"+i+" class='listing-image img-responsive zoom-img view-listing-details' src='"+response[i].image+"' data="+response[i].id+" alt=''>"
                    var exe = template.find(".mask")[0];
                    template.appendTo(".appendHere");
                }

                var listingDetailsLinks = document.getElementsByClassName("view-listing-details");
    
                for(var i=0;i < listingDetailsLinks.length;i++) {
                    listingDetailsLinks[i].addEventListener("click", function() {
                        var element = document.getElementById(this.id);
                        var idx = element.getAttribute("data");
                        getListingDetails(idx);
                    });
                };
                apiCalled = false;
            });
        }});
    };

    function getListingDetails(val){
       console.log('details api called');
       apiCalled = true;
        var url = window.location.href;
        window.location.hash = '?listingId='+val;

        $.ajax({url: "/listings.json", success: function(response){
            
            $('#body-content').load("partials/_single.html", function(){
                apiCalled = false;
            });
        }});
    };

});


