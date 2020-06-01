
$(document).ready(function () {
    $.ajax({
        async: false,
        url: "/data.json",
        data: {
            format: 'json'
        },
        error: function () {
            alert("Something went wrong!");
        },
        success: function (data) {            
            console.log(data[1])
            entriesList  = data[1].entries;
            generateEntries(data[1].entries);            
            generateRoomSelect(data[0].roomtypes);
            generateSecondLineFilters(data[1].entries);
            onTypeSearch(data[1].entries);
            onSelectPropertyRating(data[1].entries);
            onSelectGuestRating(data[1].entries);
            onSelectLocation(data[1].entries);
            onSelectOtherFilter(data[1].entries);
            
        }
    });
})

function generateEntries(entries) {
    for (var i = 0; i < entries.length; i++) {
        $('#entriesArea').append(
            "<div class='card mb-3'>" +
            "<div class='row no-gutters'>" +
            "<div class='col-md-3 p-1'>" +
            "<img src='" + entries[i].thumbnail + "' class='card-img' alt='...'>" +
            "</div>" +
            "<div class='col-md-4'>" +
            "<div class='card-body border-right h-100'>" +
            "<h5 id='hotelName' class='card-title'><strong>" + entries[i].hotelName + "</strong></h5>" +
            "<span id='star1' class='fa fa-star checked'></span>" +
            "<span id='star2' class='fa fa-star checked'></span>" +
            "<span id='star3' class='fa fa-star checked'></span>" +
            "<span id='star4' class='fa fa-star checked'></span>" +
            "<span id='star5' class='fa fa-star checked'></span>" +
                            "<p class='card-text'>" + entries[i].city + "</p>" +
            "<p class='card-text'><span class='bg-success rounded p-1 text-white'>" + entries[i].guestrating + "</span><strong> Excellent </strong>(1736 revies)</p>" +
            "<p class='card-text'>" + entries[i].ratings.text + " (" + entries[i].ratings.no + "/10)</p>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-2 text-center'>" +
            "<div class='card-body border-right h-100'>" +
            " <p class='card-text bg-info rounded text-white'>Hotel Website <br> $" + entries[i].price + "</p>" +
            "<p class='card-text rounded'>Agoda <br> $" + (entries[i].price - 100) + "</p>" +
            "<p class='card-text rounded'>Tavelocity <br> $" + (entries[i].price + 10) + "</p>" +
            " <hr class='p-1'>" +
            "<p class='card-text rounded'>More Deals From: <br><strong><a>" + (entries[i].price - 100) + "&nbsp;<i class='fas fa-angle-down'></i></strong></p>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-3 text-center'>" +
            "<div class='card-body border-right h-100 text-success'>" +
            "<p class='card-text'>Hotel Website</p>" +
            "<h5 class='card-text'><strong>$" + entries[i].price + "</strong></h5>" +
            "<p class='card-text'><span class='text-dark'>3 Nights for</span> $" + (entries[i].price * 3) + "</p>" +
            "<button class='btn btn-success text-white'>View Deal</button>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
        configureStarRating(entries);
    }

    

}

function configureStarRating(entries) {
    for(var i = 0; i < entries.length; i++) {        
        if(entries[i].rating === 4) {
            $('#star5').removeClass('checked');                    
        }
    }
    
}

function generateRoomSelect(roomtypes) {
    for(var i = 0; i<roomtypes.length; i++) {
        $('#roomSizeFilter').append(
            "<option value='"+ roomtypes[i].name +"'>"+ roomtypes[i].name +"</option>"
        )
    }    
}

function generateSecondLineFilters(entries) {

    //property type filter
    var ratings = [];
    for(var i = 0; i<entries.length; i++) {
        ratings.push(entries[i].rating)
    }
    var uniqueRatings = [];
    $.each(ratings, function(i, el){
        if($.inArray(el, uniqueRatings) === -1) uniqueRatings.push(el);
    });
    for(var i = 0; i<uniqueRatings.length; i++) {
        $('#propertyTypeFilter').append(
            "<option value='"+ uniqueRatings[i] +"'>"+ uniqueRatings[i] +" stars</option>"
        )
    }

    //guest rating filter
    var guestRatings = [];
    for(var i = 0; i<entries.length; i++) {
        guestRatings.push(entries[i].guestrating)
    }
    var uniqueGuestRatings = [];
    $.each(guestRatings, function(i, el){
        if($.inArray(el, uniqueGuestRatings) === -1) uniqueGuestRatings.push(el);
    });
    for(var i = 0; i<uniqueGuestRatings.length; i++) {
        $('#guestRatingFilter').append(
            "<option value='"+ uniqueGuestRatings[i] +"'>"+ uniqueGuestRatings[i] +" stars</option>"
        )
    }

    //location filter
    var locations = [];
    for(var i = 0; i<entries.length; i++) {
        locations.push(entries[i].city)
    }
    var uniqueLocations = [];
    $.each(locations, function(i, el){
        if($.inArray(el, uniqueLocations) === -1) uniqueLocations.push(el);
    });
    for(var i = 0; i<uniqueLocations.length; i++) {
        $('#locationFilter').append(
            "<option value='"+ uniqueLocations[i] +"'>"+ uniqueLocations[i] +"</option>"
        )
    } 

    //other filters filter    
    for(var i = 0; i<entries[0].filters.length; i++) {
        $('#otherFilters').append(
            "<option value='"+ entries[0].filters[i].name +"'>"+ entries[0].filters[i].name +"</option>"
        )
    }

    //price range filter
    var listOfPrices = [];
    for (var i = 0; i < entries.length; i++) {        
        listOfPrices.push(entries[i].price);
    }
    var sortedListOfPrices = listOfPrices.sort((a, b) => a - b);
    var slider = document.getElementById("myRange");
    var output = document.getElementById("showBar");   
    $('#myRange').attr("min", sortedListOfPrices[0]);
    $('#myRange').attr("max", sortedListOfPrices[sortedListOfPrices.length - 1]);
    $('#myRange').attr("value", sortedListOfPrices[sortedListOfPrices.length - 1]);
    output.innerHTML = "Maximum Price: " + slider.value;    
    slider.onchange = function () {
        output.innerHTML = "Maximum Price: " + this.value;
        handleChange();
    }

}

var keyword = "";
var propertyType = 0;
var guestRating = 0;
var city = "";
var otherFilter = "";
function onTypeSearch(entries) {    
    $('#searchInput').on('input', function(){
        keyword = $('#searchInput').val();
        handleChange();        
    })    
}
function onSelectPropertyRating(entries) {    
    $('#propertyTypeFilter').on('change', function(){
        propertyType = $(this).val();
        handleChange();
    })
}

function onSelectGuestRating(entries) {    
    $('#guestRatingFilter').on('change', function(){
        guestRating = $(this).val();
        handleChange();
    })
}

function onSelectLocation(entries) {
    $('#locationFilter').on('change', function(){
        city = $(this).val();
        handleChange();
    })
}

function onSelectOtherFilter(entries) {
    $('#otherFilters').on('change', function(){
        otherFilter = $(this).val();
        handleChange();
    })
}



function handleChange() {
    $('#entriesArea').empty();
    generateEntries(entriesList.filter(filtering))
}

function filtering(entry) {   
    var boolean = false;
    if($('#myRange').val() < entry.price) {
        console.log("mpike");
        return false;
    }
    for(var i = 0; i<entry.filters.length; i++) {
        if(otherFilter === entry.filters[i].name || otherFilter === "") {
            boolean = true;
        }
    }
    return entry.hotelName.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    && entry.rating >= propertyType && entry.guestrating >= guestRating 
    && entry.city.trim().toLowerCase().includes(city.trim().toLowerCase()) && boolean;
}
