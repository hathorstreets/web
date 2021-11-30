$( document ).ready(function() {
    let offerTokens = $('#offer_tokens');
    let offerTokensTags = $('#offer_tokens_tags');

    let demandTokens = $('#demand_tokens');
    let demandTokensTags = $('#demand_tokens_tags');

    let processTokensInput = function(input, tags) {
        if(input.val().length === 64) {
            let tag = $('<span class="Tag">');
            tag.html(input.val());
            let remove = $('<a href="#" class="TagRemove"><img src="../images/close.png"></a>');
            remove.click(function() {
                $(this).parent().remove();
                return false;
            });
            tag.append(remove);
            tags.append(tag);
            input.val('');
        }
    };

    $('#add_offer_token').click(function(){
        processTokensInput(offerTokens, offerTokensTags);
    });

    $('#add_demand_token').click(function(){
        processTokensInput(demandTokens, demandTokensTags);
    });

    offerTokens.keypress(function (e) {
        if (e.which === 13) {
            processTokensInput(offerTokens, offerTokensTags);
            return false;
        }
    });

    demandTokens.keypress(function (e) {
        if (e.which === 13) {
            processTokensInput(demandTokens, demandTokensTags);
            return false;
        }
    });


});
