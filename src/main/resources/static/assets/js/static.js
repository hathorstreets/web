$( document ).ready(function() {
    if (location.href.indexOf("hathorstreets") >= 0 && location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
});

let numberOfNfts = 11111;

let getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return undefined;
};

let setUrlParameter  = function setUrlParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

let showInfo = function(message, time = 5000) {
    let x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    x.className = x.className.replace("error", "");
    setTimeout(function(){
        x.className = x.className.replace("show", "");
    }, time);
}

let showError = function(message, time = 5000) {
    let x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show error";
    setTimeout(function(){
        x.className = x.className.replace("show error", "");
    }, time);
}

let showLoader = function() {
    $('#loader_bg').show();
    $('#loader').show();
}

let hideLoader = function() {
    $('#loader_bg').hide();
    $('#loader').hide();
}

let saveCookie = function (name, value, exdays = 365) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

let getCookie = function(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let processInputNumbers =  function(input){
    let value = input.value;
    let numbers = value.replace(/[^0-9,]/g, "");
    input.value = numbers;
}

let copyToClipboard = function(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
    });
}
