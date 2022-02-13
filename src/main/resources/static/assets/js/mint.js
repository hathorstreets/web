$( document ).ready(function() {

    let address = $('#deposit_address');
    let qrInitialized = false;
    let nftInitialized = false;
    let price = $('#price');
    let builderLink = $('.builder_link');

    let sendSection = $('#send_section');
    let depositSection = $('#deposit_section');
    let nftSection = $('#nft_section');
    let nftContainer = $('#nft_container');

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

    let getRarityPercentage = function(rarity) {
        return Math.round(rarity * 10000 / numberOfNfts) / 100 + ' %';
    }

    let createStreets = function(mint) {
        let columns = $('<div class="columns is-centered is-multiline mt-5">');
        nftContainer.append(columns);
        for(let i in mint.streets) {
            if(i % 3 === 0) {
                columns = $('<div class="columns is-centered is-multiline mt-5">');
                nftContainer.append(columns);
            }
            let street = mint.streets[i];
            let column = $('<div class="column is-3">');
            columns.append(column);
            let box = $('<div class="box">');
            column.append(box);
            let titleA = $('<a target="_blank" style="color: black;" href="explorer.html?id=' + street.id + '"></a>');
            let title = $('<h2 class="has-text-weight-bold is-size-3">');
            title.html("Street no. " + street.id);
            titleA.append(title);
            box.append(titleA);
            let imgWrapper = $('<div class="is-fullwidth mb-5" style="position: relative; min-height: 234px">');
            let img = $('<img src="' + street.ipfs + '" class="image is-fullwidth mb-5" alt="">');
            let imgLoader = $('<img src="images/loading.gif" class="image is-fullwidth mb-5" alt="" style="position: absolute; top: 0; left: 0; padding: 50px;">');
            imgWrapper.append(imgLoader);
            imgWrapper.append(img);
            box.append(imgWrapper);
            let ul = $('<ul>');
            box.append(ul);
            let top = $('<li>TOP: <strong>' + street.topQuad + '</strong> <small>' + getRarityPercentage(street.topQuadRarity) + '</small>');
            ul.append(top);
            let left = $('<li>LEFT: <strong>' + street.leftQuad + '</strong> <small>' + getRarityPercentage(street.leftQuadRarity) + '</small>');
            ul.append(left);
            let right = $('<li>RIGHT: <strong>' + street.rightQuad + '</strong> <small>' + getRarityPercentage(street.rightQuadRarity) + '</small>');
            ul.append(right);
            let bottom = $('<li>BOTTOM: <strong>' + street.bottomQuad + '</strong> <small>' + getRarityPercentage(street.bottomQuadRarity) + '</small>');
            ul.append(bottom);
            let road = $('<li>ROAD: <strong>' + street.road + '</strong> <small>' + getRarityPercentage(street.roadRarity) + '</small>');
            ul.append(road);
            let billboard = $('<li>BILLBOARD: <strong>' + street.billboard + '</strong> <small>' + getRarityPercentage(street.billboardRarity) + '</small>');
            ul.append(billboard);
            let special = $('<li>SPECIAL: <strong>' + street.special + '</strong> <small>' + getRarityPercentage(street.specialRarity) + '</small>');
            ul.append(special);
            box.append('<br>');
            let explorerLink = $('<a href="https://explorer.hathor.network/token_detail/' + street.token + '" target="_blank" title="View in Hathor Explorer" style="border-bottom: 0;"><i class="fas fa-external-link-square-alt"></i> View in Hathor Explorer</a>')
            box.append(explorerLink);
        }
    }

    let updateMint = function(mint) {
        if (mint.state === 1) { //WAITING_FOR_DEPOSIT
            sendSection.show();
            depositSection.hide();
            nftSection.hide();
            address.html(mint.depositAddress);
            price.html(mint.price + ' $HTR');
            if(!qrInitialized) {
                let htrPrice = mint.price * 100;
                let paymentRequest = '{"address":"hathor:' + mint.depositAddress + '","amount":' + htrPrice + ',"token":{"name":"Hathor","symbol":"HTR","uid":"00"}}';
                new QRCode(document.getElementById("qrcode"), paymentRequest);
                qrInitialized = true;
            }
        }
        else if (mint.state === 2) { //SENDING_NFT
            sendSection.hide();
            depositSection.show();
            nftSection.hide();
        }
        else if (mint.state === 3) { //NFT_SENT
            sendSection.hide();
            depositSection.hide();
            nftSection.show();
            let ids = [];
            for(let i in mint.streets) {
                ids.push(mint.streets[i].id);
            }
            $('#build_city_button').click(function() {

            });
            builderLink.attr('href', 'builder.html?ids=' + ids)
            if(!nftInitialized) {
                createStreets(mint);
                nftInitialized = true;
            }
        }
        // else if (mint.state === 4) { //OUT OF STREETS
        //     qrcode.hide();
        //     addressWrapper.hide();
        //     sending.hide();
        //     status.show();
        //     status.html("We are sorry but all the streets were sold out.<br/>We will send your $HTR back!");
        //     soldOut.show();
        //     nft_wrapper.hide();
        //     sendBack.hide();
        // }
        // else if (mint.state === 5) { //Deposit sent back
        //     qrcode.hide();
        //     addressWrapper.hide();
        //     sending.hide();
        //     status.show();
        //     status.html("We are sorry but all the streets were sold out.<br/>Your deposit was send back to you!");
        //     soldOut.hide();
        //     sendBack.show();
        //     nft_wrapper.hide();
        // }
    }

    let mintId = getUrlParameter("mint");

    getMint();

    setInterval(getMint, 5000);
});
