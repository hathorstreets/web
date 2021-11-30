$( document ).ready(function() {

    $('#create_nft').click(function() {
        $("#create_nft_modal").modal();
    });

    $('#create_nft_save').click(function() {
        let address = $('#create_nft_address').val();
        if (!address || address.length !== 34) {
            showError("Invalid address!");
            return;
        }
        let id = getUrlParameter("id");
        $.ajax({
            url: '/createCityNft/' + id + '/' + address,
            type: 'GET',
            success: function(nftCity){
                $("#builder_save_modal").modal('hide');
                window.location.href = 'nft.html?id=' + nftCity.id;
            },
            error: function(data) {
                showError("Something went wrong, please try again later!");
            }
        });
    });
});
