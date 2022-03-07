$( document ).ready(function() {
    let address = $('#deposit_address');
    let qrInitialized = false;
    let nftInitialized = false;

    let sendSection = $('#send_section');
    let depositSection = $('#deposit_section');
    let nftSection = $('#nft_section');
    let sendBackSection = $('#send_back_section');
    let qrcode = $('#qrcode');
    let streets = $('#streets');
    let nftContainer = $('#nft_container');

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
            sendSection.show();
            depositSection.hide();
            nftSection.hide();
            sendBackSection.hide();
            address.html(cityNft.depositAddress);
            if(!qrInitialized) {
                symbols = [];
                for(let i in cityNft.streets){
                    let street = cityNft.streets[i];
                    let id = 'qr_code_' + street.tokenSymbol;
                    symbols.push(street.tokenSymbol);
                    let qrWrapper = $('<div class="QrCode">');
                    qrWrapper.append('<strong>' + street.tokenSymbol + '</strong>');
                    qrcode.append(qrWrapper);
                    let qr = $('<div class="QrCode" id="' + id + '">');
                    qrWrapper.append(qr);
                    let paymentRequest = '{"address":"hathor:' + cityNft.depositAddress + '","amount":1,"token":{"name":"' + street.tokenSymbol + '","symbol":"' + street.tokenSymbol + '","uid":"' + street.token + '"}}';
                    new QRCode(document.getElementById(id), paymentRequest);
                }
                streets.html(symbols.join(', '));
                qrcode.slick();
                qrInitialized = true;
            }
        }
        else if (cityNft.state === 2) { //CREATING_NFT
            sendSection.hide();
            depositSection.show();
            nftSection.hide();
            sendBackSection.hide();
        }
        else if (cityNft.state === 3 || cityNft.state === 6) { //NFT_SENT
            sendSection.hide();
            depositSection.hide();
            nftSection.show();
            sendBackSection.hide();
            if (!nftInitialized) {
                let box = $('<div class="box">');
                let imgWrapper = $('<div class="is-fullwidth mb-5" style="position: relative; min-height: 234px">');
                let img = $('<img src="' + cityNft.ipfs + '" alt="city">');
                let imgLoader = $('<img src="images/loading.gif" id="ipfsLoader" class="image mb-5" alt="" style="position: absolute; top: 0; left: 0;">');
                imgWrapper.append(imgLoader);
                imgWrapper.append(img);
                img.on('load', function() {
                    $('#ipfsLoader').hide();
                })
                box.append(imgWrapper);
                let explorerLink = $('<a href="https://explorer.hathor.network/token_detail/' + cityNft.token + '" target="_blank" title="View in Hathor Explorer" style="border-bottom: 0;"><i class="fas fa-external-link-square-alt"></i> View in Hathor Explorer</a>')
                box.append(explorerLink);
                nftContainer.append(box);

                let box2 = $('<div class="box">');
                let imgWrapper2 = $('<div class="is-fullwidth mb-5" style="position: relative; min-height: 234px">');
                let img2 = $('<img src="' + cityNft.ipfsWithoutTraits + '" alt="city">');
                let imgLoader2 = $('<img src="images/loading.gif" id="ipfsWithoutTraitsLoader" class="image mb-5" alt="" style="position: absolute; top: 0; left: 0;">');
                imgWrapper2.append(imgLoader2);
                imgWrapper2.append(img2);
                img2.on('load', function() {
                    $('#ipfsWithoutTraitsLoader').hide();
                })
                box2.append(imgWrapper2);
                let explorerLink2 = $('<a href="https://explorer.hathor.network/token_detail/' + cityNft.tokenWithoutTraits + '" target="_blank" title="View in Hathor Explorer" style="border-bottom: 0;"><i class="fas fa-external-link-square-alt"></i> View in Hathor Explorer</a>')
                box2.append(explorerLink2);
                nftContainer.append(box2);

                nftInitialized = true;
            }
        }
        else if (cityNft.state === 5) { //Send back
            sendSection.hide();
            depositSection.hide();
            nftSection.hide();
            sendBackSection.show();
        }
    }

    let cityNftId = getUrlParameter("id");

    getCityNft();

    setInterval(getCityNft, 5000);
});
