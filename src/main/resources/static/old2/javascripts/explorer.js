$( document ).ready(function() {

    let image = $('#explorer_street_image');
    let properties = $('#explorer_street_properties');
    let title = $('#explorer_street_title');
    let titleSpan = $('#explorer_street_title_span');
    let explorerLink = $('#explorer_hathor_explorer');

    let street_number = $('#explorer_street_number');
    let search = $('#explorer_search');

    let wrapper = $('#street_wrapper');

    let getRarityPercentage = function(rarity) {
        return Math.round(rarity * 10000 / numberOfNfts) / 100 + ' %';
    }

    let getStreet = function() {
        showLoader();
        $.ajax({
            url: '/street/' + streetId,
            type: 'GET',
            success: function(street){
                wrapper.show();
                title.show();
                image.show();
                image.html(null);
                properties.show();
                let imageDiv = $('<div class="ExplorerImageWrapper"></div>');
                imageDiv.append('<img class="ExplorerStreetImage" src="' + street.ipfs + '" alt="' + streetId +'">');
                imageDiv.append('<div class="ExplorerLoading">');
                image.append(imageDiv);
                explorerLink.attr('href', 'https://explorer.hathor.network/token_detail/' + street.token);
                titleSpan.text('Street no. ' + streetId);

                $('#explorer_top_rarity').html(getRarityPercentage(street.topQuadRarity));
                $('#explorer_top_rarity').attr('title', street.topQuadRarity + ' (' + getRarityPercentage(street.topQuadRarity) + ') out of 11 111 Hathor Streets have this part');
                $('#explorer_top_label').html(street.topQuad);

                $('#explorer_left_rarity').html(getRarityPercentage(street.leftQuadRarity));
                $('#explorer_left_rarity').attr('title', street.leftQuadRarity + ' (' + getRarityPercentage(street.leftQuadRarity) + ') out of 11 111 Hathor Streets have this part');
                $('#explorer_left_label').html(street.leftQuad);

                $('#explorer_right_rarity').html(getRarityPercentage(street.rightQuadRarity));
                $('#explorer_right_rarity').attr('title', street.rightQuadRarity + ' (' + getRarityPercentage(street.rightQuadRarity) + ') out of 11 111 Hathor Streets have this part');
                $('#explorer_right_label').html(street.rightQuad);

                $('#explorer_bottom_rarity').html(getRarityPercentage(street.bottomQuadRarity));
                $('#explorer_bottom_rarity').attr('title', street.bottomQuadRarity + ' (' + getRarityPercentage(street.bottomQuadRarity) + ') out of 11 111 Hathor Streets have this part');
                $('#explorer_bottom_label').html(street.bottomQuad);

                $('#explorer_road_rarity').html(getRarityPercentage(street.roadRarity));
                $('#explorer_road_rarity').attr('title', street.roadRarity + ' (' + getRarityPercentage(street.roadRarity) + ') out of 11 111 Hathor Streets have this part');
                $('#explorer_road_label').html(street.road);

                $('#explorer_billboard_rarity').html(getRarityPercentage(street.billboardRarity));
                $('#explorer_billboard_rarity').attr('title', street.billboardRarity + ' (' + getRarityPercentage(street.billboardRarity) + ') out of 11 111 Hathor Streets have this part');
                if(street.billboard.indexOf('@') >= 0) {
                    let twitter = street.billboard.substr(1, street.billboard.length - 1);
                    $('#explorer_billboard_label').html('<a target="_blank" href="https://twitter.com/' + twitter + '">' + street.billboard + '</a>');
                } else {
                    $('#explorer_billboard_label').html(street.billboard);
                }


                $('#explorer_special_rarity').html(getRarityPercentage(street.specialRarity));
                $('#explorer_special_rarity').attr('title', street.specialRarity + ' (' + getRarityPercentage(street.specialRarity) + ') out of 11 111 Hathor Streets have this part');
                $('#explorer_special_label').html(street.special);

                hideLoader();
            },
            error: function(error) {
                wrapper.hide();
                hideLoader();
                showError("Something went wrong<br/>please try again later!")
            }
        });
    };

    var streetId = getUrlParameter("id");

    if(streetId) {
        street_number.val(streetId);
        getStreet();
    }
    else {
        wrapper.hide();
    }

    var searchNow = function() {
        streetId = street_number.val();
        if(streetId) {
            var newURL = setUrlParameter(window.location.href, 'id', streetId);
            window.history.replaceState('', '', newURL);
            getStreet();
        }
        else {
            wrapper.hide();
        }
    }

    search.click(function() {
        searchNow();
    });

    street_number.keypress(function (e) {
        if (e.which == 13) {
            searchNow();
            return false;
        }
    });
});
