$(document).ready(function() {
    let id = getUrlParameter("id");
    let checkImageInterval = undefined;
    showLoader();

    let insertImage = function(city) {
        let img = $('<img alt="image" class="Zoomed">');
        img.attr('src', 'https://ipfs.io/ipfs/' + city.ipfs);
        $('body').append(img);

        img.on('load', function(){
            hideLoader();
        });

        img.click(function(){
            if($(this).hasClass('Zoomed')){
                $(this).removeClass('Zoomed');
                $(this).addClass('NotZoomed');
            } else {
                $(this).addClass('Zoomed');
                $(this).removeClass('NotZoomed');
            }
        })
    }

    let checkImage = function() {
        $.ajax({
            type: "GET",
            url: '/getCityImage/' + id,
            contentType: "application/json; charset=utf-8",
            success: function(city) {
                if(city.ipfs) {
                    clearInterval(checkImageInterval);
                    insertImage(city);
                }
            },
            dataType: 'json'
        });
    }

    $.ajax({
        type: "GET",
        url: '/requestCityImage/' + id,
        contentType: "application/json; charset=utf-8",
        success: function(city) {
            if(city.ipfs) {
                insertImage(city);
            } else {
                checkImageInterval = setInterval(checkImage, 5000);
            }
        },
        error: function() {
            showError("Something went wrong, try again later.");
            hideLoader();
        },
        dataType: 'json'
    });
})
