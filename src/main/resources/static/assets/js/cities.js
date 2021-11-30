$( document ).ready(function() {

    let cityTableBody = $('#city_table_body');
    let table = undefined;
    let cityList = [];

    showLoader();

    $.ajax({
        url: '/cities',
        type: 'GET',
        success: function (cities) {
            cityList = cities;
            var j = 1;
            for(i in cities) {
                let city = cities[i];
                let name = city.name ? city.name : "No Name";

                let tr = $('<tr>');
                let idTd = $('<td>');
                let nameTd = $('<td>');
                let noOfTilesTd = $('<td>');

                idTd.html(city.order);
                nameTd.html(name);
                noOfTilesTd.html(city.tiles);

                tr.append(idTd);
                tr.append(nameTd);
                tr.append(noOfTilesTd);

                cityTableBody.append(tr);
                j++;
            }
            let table = $('#city_table').DataTable({
                "paging":   false,
                "info":     false,
                language: {
                    search: "",
                    searchPlaceholder: "Search..."
                }
            });

            $('#city_table tbody').on('click', 'tr', function () {
                let data = table.row( this ).data();
                for(let i in cityList) {
                    let c = cityList[i];
                    if (c.order === parseInt(data[0])) {
                        window.open('builder.html?shareId=' + c.shareId, '_blank').focus();
                        break;
                    }
                }
            });

            hideLoader();
        },
        error: function (error) {
            hideLoader();
            showError("Something went wrong<br/>please try again later!");
        }
    });
});
