$( document ).ready(function() {

    let citiesDiv = $('#cities');

    showLoader();

    $.ajax({
        url: '/cities',
        type: 'GET',
        success: function (cities) {
            var j = 1;
            for(i in cities) {
                let city = cities[i];
                let row = $('<div class="col-12 col-12-mobile">');
                let name = city.name ? city.name : "No Name";
                row.append('<a href="builder.html?shareId=' + city.shareId + '" target="_blank">' + j + '. ' + name + "</a>");
                citiesDiv.append(row);
                j++;
            }
            hideLoader();
        },
        error: function (error) {
            hideLoader();
            showError("Something went wrong<br/>please try again later!");
        }
    });
});
