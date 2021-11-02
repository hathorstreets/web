$( document ).ready(function() {
    let mint = $('#mint');
    let address = $('#address');
    let count = $('#count');
    let soldCounter = $('#sold_counter');

    //address.val('HSHqkJstGEDZN5m5AKXvX9d1j56DwATNSG');

    let refreshSoldCount = function() {
        $.ajax({
            url: '/street/sold',
            type: 'GET',
            success: function(soldCount){
                soldCounter.show();
                soldCounter.html((11111 - soldCount.count) + ' / 11111 streets remaining');
                let percentage = Math.round(soldCount.count / 100);
                if(percentage != 0) {
                    let background = 'linear-gradient(90deg, #d9c3fa ' + percentage + '%, #FFFFFF 1%)';
                    soldCounter.css('background', background);
                }
            },
            error: function(data) {
                //soldCounter.hide();
            }
        });
    };

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
        showLoader();
        $.ajax({
            url: '/mint/' + addr + '/' + c,
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
