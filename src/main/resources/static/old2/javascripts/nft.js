$( document ).ready(function() {
    $.noConflict();

    let qrcode = $('#nft_qrcode');
    let address = $('#nft_address');
    let addressWrapper = $('#nft_address_wrapper');
    let status = $('#nft_status');
    let nft = $('#nft_nft');
    let nft_wrapper = $('#nft_nft_wrapper');
    let sending = $('#nft_sending');
    let soldOut = $('#nft_sold_out');
    let sendBack = $('#nft_sent_back');
    let qrInitialized = false;
    let nftInitialized = false;

    $('#nft_copy').click(function() {
        //navigator.clipboard.writeText(address.html());
        copyToClipboard(address.html());
        showInfo("Copied!");
    });

    let getCityNft = function() {
        $.ajax({
            url: '/getCityNft/' + cityNftId,
            type: 'GET',
            success: function(cityNft){
                updateCityNft(cityNft)
            },
            error: function(error) {
                console.log(error);
            }
        });
    };

    let updateCityNft = function(cityNft) {
        if (cityNft.state === 1) { //WAITING_FOR_DEPOSIT
            qrcode.show();
            addressWrapper.show();
            address.html(cityNft.depositAddress);
            status.show();
            status.html("Waiting for deposit, send all of these tokens to this address.<br/>Please, be patient, it can take up to an hour.<br/>Bookmark this page and get some &#9749;");
            nft_wrapper.hide();
            sending.hide();
            sendBack.hide();
            if(!qrInitialized) {
                for(let i in cityNft.streets){
                    let street = cityNft.streets[i];
                    let id = 'qr_code_' + street.tokenSymbol;
                    let qr = $('<div class="QrCode" id="' + id + '">');
                    qrcode.append(qr);
                    let paymentRequest = '{"address":"hathor:' + cityNft.depositAddress + '","amount":1,"token":{"name":"' + street.name + '","symbol":"' + street.tokenSymbol + '","uid":"' + street.token + '"}}';
                    new QRCode(document.getElementById(id), paymentRequest);
                }
                qrInitialized = true;
            }
        }
        else if (cityNft.state === 2) { //SENDING_NFT
            qrcode.hide();
            addressWrapper.hide();
            status.show();
            status.html("Deposit processed!<br/>Sending NFT to " + mint.userAddress + ".<br/>Please, be patient, it can take up to an hour.<br/>Bookmark this page and get some &#9749;");
            sending.show();
            nft_wrapper.hide();
            soldOut.hide();
            sendBack.hide();
        }
        else if (cityNft.state === 3) { //NFT_SENT
            qrcode.hide();
            addressWrapper.hide();
            status.show();
            status.html("NFT successfully sent to " + mint.userAddress + " &#127881;");
            nft_wrapper.show();
            sending.hide();
            soldOut.hide();
            sendBack.hide();
            if(!nftInitialized) {
                nft.append('<div>Your Streets:</div>');
                let ids = '';
                for (let i in mint.streets) {
                    let streetId = mint.streets[i];
                    ids += streetId + ',';
                    let link = $('<div><a target="_blank" href="explorer.html?id=' + streetId + '">Street no. ' + streetId + '</a></div>');
                    nft.append(link);
                }
                if (ids.length > 0) {
                    ids = ids.substring(0, ids.length - 1);
                    let link = $('<div style="margin-top: 10px;"><a target="_blank" href="builder.html?ids=' + ids + '">Build your own city!</a></div>');
                    nft.append(link);
                }
                nftInitialized = true;
            }
        }
        else if (mint.state === 4) { //OUT OF STREETS
            qrcode.hide();
            addressWrapper.hide();
            sending.hide();
            status.show();
            status.html("We are sorry but all the streets were sold out.<br/>We will send your $HTR back!");
            soldOut.show();
            nft_wrapper.hide();
            sendBack.hide();
        }
        else if (mint.state === 5) { //Deposit sent back
            qrcode.hide();
            addressWrapper.hide();
            sending.hide();
            status.show();
            status.html("We are sorry but all the streets were sold out.<br/>Your deposit was send back to you!");
            soldOut.hide();
            sendBack.show();
            nft_wrapper.hide();
        }
    }

    let cityNftId = getUrlParameter("id");

    getCityNft();

    setInterval(getCityNft, 5000);
});
