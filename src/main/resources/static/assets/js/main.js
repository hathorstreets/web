$( document ).ready(function() {
    let mint = $('#mint');
    let address = $('#address');
    let email = $('#email');
    let count = $('#count');
    let freeCounter = $('.free_counter');
    let cityDiv = $('#cities');
    let progress = $('#progress');

    //address.val('HSHqkJstGEDZN5sold_counterm5AKXvX9d1j56DwATNSG');

    let refreshSoldCount = function() {
        $.ajax({
            url: '/street/sold',
            type: 'GET',
            success: function(soldCount){
                freeCounter.html((11111 - soldCount.count));
                progress.val(parseInt((soldCount.count / 11111) * 100))
            }
        });
    };


    $.ajax({
        url: '/topCities',
        type: 'GET',
        success: function(cities){
            for(let i in cities){
                let city = cities[i];
                let ipfs = city.ipfs;
                let name = city.name;
                let shareId = city.shareId;

                let column = $('<div class="column">');
                let title = $('<h3 class="is-size-5 city mb-3" style="cursor: pointer;" shareId = "' + shareId + '">');
                let count = $('<span class="has-text-white">');
                let img = $('<img src="' + ipfs + '">')

                title.html(name);
                count.html(city.streets.length + ' streets');
                column.append(title);
                column.append(count);
                column.append(img);

                title.click(function(){
                    let shareId = $(this).attr('shareId');
                    window.location.href = 'builder.html?shareId=' + shareId;
                })

                cityDiv.append(column);
            }
        }
    });

    refreshSoldCount();
    setInterval(refreshSoldCount, 10000);

    mint.click(function(){
        let addr = address.val();
        if (!addr || addr.length !== 34) {
            showError("Invalid address!");
            return;
        }

        let c = count.val();
        if (!c || c < 1 || c > 10) {
            showError("Invalid count");
            return;
        }
        let mail = email.val();
        if(!mail || mail === '') {
            mail = 'empty';
        }
        showLoader();
        $.ajax({
            url: '/mint/' + addr + '/' + c + '/' + mail,
            type: 'GET',
            success: function(mint){
                window.location.href = 'mint.html?mint=' + mint.id;
            },
            error: function(data) {
                showError("Something went wrong, please try again later!");
            }
        });
    });
});
