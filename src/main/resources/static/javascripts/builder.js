$( document ).ready(function() {

    let gridSnapX = 249.6;
    let gridSnapY = 144;

    let search = $('#builder_search_input');
    let globalCity = {};

    let validateStreets = function () {
        let wrongStreets = [];
        let streets = $('.street');
        streets.each(function() {
            let i_street = $(this);
            let x = i_street.attr('data-x');
            let y = i_street.attr('data-y');

            streets.each(function() {
                let j_street = $(this);
                let xx = j_street.attr('data-x');
                let yy = j_street.attr('data-y');

                if(i_street.attr('street_id') !== j_street.attr('street_id')) {
                    let collision = false;

                    if (round(Math.abs(xx - x)) === gridSnapX) {
                        if (round(Math.abs(yy - y)) === 0) {
                            collision = true;
                        }
                    }

                    if (round(Math.abs(xx - x)) === 0) {
                        if (round(Math.abs(yy - y)) <= gridSnapY) {
                            collision = true;
                        }
                    }

                    if(collision) {
                        wrongStreets.push(i_street);
                        wrongStreets.push(j_street);
                    }
                }
            });
        });

        streets.removeClass('WrongPlacement');
        wrongStreets.forEach(st => st.addClass('WrongPlacement'));
    }

    let addStreet = function(st, isShare) {
        let street = $('<img src="' + st.ipfs + '" class="street SelectDisable" street_id="' + st.streetId + '" street_city_id="' + st.id + '">');
        street.css('transform', 'translate(' + st.x + 'px, ' + st.y + 'px)');
        street.attr('data-x', st.x);
        street.attr('data-y', st.y);
        street.css('z-index', Math.round(st.y));

        let draggable = $('<div class="draggable" street_id="' + st.streetId + '"></div>');
        draggable.css('transform', 'translate(' + st.x + 'px, ' + st.y + 'px) rotateX(55deg) rotateZ(45deg)');
        draggable.attr('data-x', st.x);
        draggable.attr('data-y', st.y);
        if(shareId) {
            draggable.addClass('share');
        }

        let loading = $('<div class="loading" street_id="' + st.streetId + '"></div>');
        loading.css('transform', 'translate(' + st.x + 'px, ' + st.y + 'px) rotateX(55deg) rotateZ(45deg)');

        $("body").append(street);
        $("body").append(draggable);
        $("body").append(loading);

        street.on('load', function(){
            let street_id = $(this).attr('street_id');
            $('.loading').each(function() {
                if ($(this).attr("street_id") === street_id){
                    $(this).remove();
                }
            })
        });

        if(!isShare) {
            validateStreets();
        }
    }

    $('#copy_public_link').click(function(){
        let val = location.protocol + '//' + location.host + location.pathname + '?shareId=' + globalCity.shareId;
        //navigator.clipboard.writeText(val);
        copyToClipboard(val);
        showInfo("Public link copied!");
    });

    $('#start_over').click(function(){
        window.location.href = location.protocol + '//' + location.host + location.pathname;
    });

    let loadById = function (id) {
        showLoader();
        $.ajax({
            type: "GET",
            url: '/city/' + id,
            contentType: "application/json; charset=utf-8",
            success: function(city) {
                $('.street').each(function() {
                    $(this).remove();
                })
                globalCity = city;
                for(i in city.streets){
                    let st = city.streets[i];

                    addStreet(st);
                }
                $('#builder_modal_city_name').val(city.name);
                hideLoader();
                $('#copy_public_link').show();
            },
            error: function() {
                hideLoader();
                showError("Something went wrong!");
            },
            dataType: 'json'
        });
    }

    let id = getUrlParameter("id");
    if (id) {
        loadById(id);
    }

    let shareId = getUrlParameter("shareId");
    if(shareId) {
        $('#builder_tool_bar').hide();

        showLoader();
        $.ajax({
            type: "GET",
            url: '/city/share/' + shareId,
            contentType: "application/json; charset=utf-8",
            success: function(city) {
                for(i in city.streets){
                    let st = city.streets[i];

                    addStreet(st, true);
                }
                if(city.name && city.name !== '') {
                    $('#builder_city_name').html(city.name.toUpperCase());
                    $('#builder_city_name_wrapper').show();
                }
                hideLoader();
            },
            error: function() {
                hideLoader();
                showError("Something went wrong!");
            },
            dataType: 'json'
        });
    }

    let modalCookie = getCookie("builder_modal1");
    if(!shareId) {
        if (!modalCookie || modalCookie === 'false') {
            $("#builderModal").modal();
        }

        $('#builder_dont_show_modal').change(function () {
            saveCookie("builder_modal1", $(this).is(':checked'));
        })
    }

    let searchStreets = function() {
        let search_val = search.val();
        search_val = search_val.replace(' ', '');
        showLoader();
        $.ajax({
            type: "POST",
            url: '/streets/search',
            data: search_val,
            contentType: "application/json; charset=utf-8",
            success: function(d) {
                var j = 0;
                var z = 1;
                var offset = 0;
                for(i in d){
                    let dto = d[i];

                    let found = false;
                    $('.street').each(function() {
                        if($(this).attr('street_id') == dto.id) {
                            found = true;
                        }
                    });

                    if(!found) {
                        if (j === 4) {
                            j = 0;
                            z++;
                        }
                        if(z % 2 === 0) {
                            offset = gridSnapX;
                        } else {
                            offset = 0;
                        }

                        let x = gridSnapX * j * 2 + offset;
                        let y = gridSnapY * z;

                        dto.streetId = dto.id;
                        dto.id = 0;
                        dto.x = x;
                        dto.y = y;

                        addStreet(dto);

                        j++;
                    }
                }
                hideLoader();
            },
            error: function() {
                hideLoader();
                showError("Something went wrong!");
            },
            dataType: 'json'
        });
    }

    let ids = getUrlParameter("ids");
    if (ids) {
        search.val(ids);
        searchStreets();
        var newUrl = location.protocol + '//' + location.host + location.pathname;
        window.history.replaceState('', '', newUrl);
    }

    $('#builder_search').click(function() {
        searchStreets();
    });

    search.keypress(function (e) {
        if (e.which == 13) {
            searchStreets();
            return false;
        }
    });

    $('#save_button').click(function () {
        $("#builder_save_modal").modal();
    });

    $('#builder_modal_save').click(function() {
        $("#builder_save_modal").modal('hide');

        var data = {
            id: getUrlParameter("id"),
            name: $('#builder_modal_city_name').val(),
            streets: []
        }

        $('.street').each(function() {
            let street = $(this);
            let x;
            let y;

            let id = street.attr('street_city_id');
            let street_id = street.attr('street_id');
            $('.draggable').each(function() {
                if ($(this).attr("street_id") == street_id){
                    x = $(this).attr('data-x');
                    y = $(this).attr('data-y');
                }
            })

            data.streets.push({
                id: id ? id : 0,
                x: x,
                y: y,
                streetId: street_id
            })
        });

        showLoader();
        $.ajax({
            type: "POST",
            url: '/city',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(d) {
                loadById(d.id);
                let newUrl = setUrlParameter(window.location.href, "id", d.id);
                window.history.replaceState('', '', newUrl);
                hideLoader();
                showInfo('Your city was saved!<br/>You can use this link to edit only!<br/>If you want to share, use <i>Copy public link</i>');
            },
            error: function(err) {
                hideLoader();
                showError("Something went wrong!");
            },
            dataType: 'json'
        });
    });

    if(!shareId) {
        interact('.draggable')
            .draggable({
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        endOnly: true
                    }),
                    interact.modifiers.snap({
                        targets: [
                            interact.snappers.grid({x: gridSnapX, y: gridSnapY})
                        ],
                        range: Infinity,
                        relativePoints: [{x: 0.5, y: 1}]
                    }),
                ],

                autoScroll: true,

                listeners: {
                    move: dragMoveListener,
                }
            })
    }

    let round = function(num) {
        return Math.round(num * 10) / 10;
    }

    function dragMoveListener (event) {
        var target = event.target

        let dx = event.dx;
        let dy = event.dy;

        if (Math.abs(dx) < (gridSnapX / 2)) {
            dx = 0;
        }
        if (Math.abs(dy) < (gridSnapY / 2)) {
            dy = 0;
        }

        dx = round(dx);
        dy = round(dy);

        let x = round((parseFloat(target.getAttribute('data-x')) || 0) + dx);
        let y = round((parseFloat(target.getAttribute('data-y')) || 0) + dy);

        target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotateX(55deg) rotateZ(45deg)'

        var street_id = target.getAttribute('street_id');
        var street;
        var loading;
        $('.street').each(function() {
            if ($(this).attr("street_id") == street_id){
                street = $(this);
            }
        });
        $('.loading').each(function() {
            if ($(this).attr("street_id") == street_id){
                loading = $(this);
            }
        })

        street.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
        street.css('z-index', parseInt(y) + '');
        street.attr('data-x', x);
        street.attr('data-y', y);

        validateStreets();

        if (loading) {
            loading.css('transform', 'translate(' + x + 'px, ' + y + 'px) rotateX(55deg) rotateZ(45deg)');
        }

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    window.dragMoveListener = dragMoveListener
});
