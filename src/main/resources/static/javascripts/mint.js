$( document ).ready(function() {
    let qrcode = $('#mint_qrcode');
    let address = $('#mint_address');
    let addressWrapper = $('#mint_address_wrapper');
    let status = $('#mint_status');
    let nft = $('#mint_nft');
    let nft_wrapper = $('#mint_nft_wrapper');
    let sending = $('#mint_sending');
    let soldOut = $('#mint_sold_out');
    let sendBack = $('#mint_sent_back');
    let qrInitialized = false;
    let nftInitialized = false;

    $('#mint_copy').click(function() {
        //navigator.clipboard.writeText(address.html());
        copyToClipboard(address.html());
        showInfo("Copied!");
    });

    let getMint = function() {
        $.ajax({
            url: '/mint/' + mintId,
            type: 'GET',
            success: function(mint){
                updateMint(mint)
            },
            error: function(error) {
                console.log(error);
            }
        });
    };

    let updateMint = function(mint) {
        if (mint.state === 1) { //WAITING_FOR_DEPOSIT
            qrcode.show();
            addressWrapper.show();
            address.html(mint.depositAddress);
            status.show();
            status.html("Waiting for deposit, send " + mint.price + " $HTR to this address.<br/>Please, be patient, it can take up to an hour.<br/>Bookmark this page and get some &#9749;");
            nft_wrapper.hide();
            sending.hide();
            soldOut.hide();
            sendBack.hide();
            if(!qrInitialized) {
                let htrPrice = mint.price * 100;
                let paymentRequest = '{"address":"hathor:' + mint.depositAddress + '","amount":' + htrPrice + ',"token":{"name":"Hathor","symbol":"HTR","uid":"00"}}';
                new QRCode(document.getElementById("mint_qrcode"), paymentRequest);
                qrInitialized = true;
            }
        }
        else if (mint.state === 2) { //SENDING_NFT
            qrcode.hide();
            addressWrapper.hide();
            status.show();
            status.html("Deposit processed!<br/>Sending NFT to " + mint.userAddress + ".<br/>Please, be patient, it can take up to an hour.<br/>Bookmark this page and get some &#9749;");
            sending.show();
            nft_wrapper.hide();
            soldOut.hide();
            sendBack.hide();
        }
        else if (mint.state === 3) { //NFT_SENT
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

    let mintId = getUrlParameter("mint");

    getMint();

    setInterval(getMint, 5000);
});
