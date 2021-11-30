function connect(onMessageReceived) {
    if (typeof window !== "undefined") {
        if (typeof onMessageReceived !== 'function') {
            return {
                status: false,
                message: "`onMessageReceived` parameter should be a callback function"
            }
        }

        // browser mode
        window.postMessage({source: "hathorpay-gateway", message: "EXTERNAL_CONNECT_WALLET", payload: ""}, "*");

        // window.addEventListener("message", (event) => {
        window.onmessage = (event) => {
            // console.log("event listener for EXTERNAL_CONNECT_WALLET", event);
            if (event['data']['message'] === "EXTERNAL_CONNECT_WALLET_RESPONSE" && event['data']['source'] === "hathorpay-gateway") {
                onMessageReceived(event['data']['response']);
            }
        };

        return {
            status: true,
            message: "sent request, please receive the informations from callback function"
        }
    } else {
        // send request in modejs
        return {
            status: false,
            message: "it doesn't work in backend mode yet"
        }
    }
}

function disconnect(onMessageReceived) {
    if (typeof window !== "undefined") {
        if (typeof onMessageReceived !== 'function') {
            return {
                status: false,
                message: "`onMessageReceived` parameter should be a callback function"
            }
        }

        // browser mode
        window.postMessage({source: "hathorpay-gateway", message: "EXTERNAL_DISCONNECT_WALLET", payload: ""}, "*");

        // window.addEventListener("message", (event) => {
        window.onmessage = (event) => {
            // console.log("event listener for EXTERNAL_DISCONNECT_WALLET", event);
            if (event['data']['message'] === "EXTERNAL_DISCONNECT_WALLET_RESPONSE" && event['data']['source'] === "hathorpay-gateway") {
                onMessageReceived(event['data']['response']);
            }
        };

        return {
            status: true,
            message: "sent request, please receive the informations from callback function"
        }
    } else {
        // send request in nodejs
        return {
            status: false,
            message: "it doesn't work in backend mode yet"
        }
    }
}

function getBalance(tokenUid, onMessageReceived) {
    if (typeof window !== "undefined") {
        if (typeof onMessageReceived !== 'function') {
            return {
                status: false,
                message: "`onMessageReceived` parameter should be a callback function"
            }
        }

        if (tokenUid === "")
            tokenUid = "00";

        // browser mode
        window.postMessage({source: "hathorpay-gateway", message: "EXTERNAL_GET_BALANCE", tokenUid: tokenUid, payload: ""}, "*");

        // window.addEventListener("message", (event) => {
        window.onmessage = (event) => {
            // console.log("event listener for external_get_balance", event);
            if (event['data']['message'] === "EXTERNAL_GET_BALANCE_RESPONSE" && event['data']['source'] === "hathorpay-gateway") {
                onMessageReceived(event['data']['response']);
            }
        };

        return {
            status: true,
            message: "sent request, please receive the informations from callback function"
        }
    } else {
        // send request in nodejs
        return {
            status: false,
            message: "it doesn't work in backend mode yet"
        }
    }
}

function getTokenOwnerStatus(tokenUid, onMessageReceived) {
    if (typeof window !== "undefined") {
        if (typeof onMessageReceived !== 'function') {
            return {
                status: false,
                message: "`onMessageReceived` parameter should be a callback function"
            }
        }

        // browser mode
        window.postMessage({source: "hathorpay-gateway", message: "EXTERNAL_GET_TOKEN_OWNER_STATUS", tokenUid: tokenUid, payload: ""}, "*");

        // window.addEventListener("message", (event) => {
        window.onmessage = (event) => {
            // console.log("event listener for EXTERNAL_GET_TOKEN_OWNER_STATUS", event);
            if (event['data']['message'] === "EXTERNAL_GET_TOKEN_OWNER_STATUS_RESPONSE" && event['data']['source'] === "hathorpay-gateway") {
                onMessageReceived(event['data']['response']);
            }
        };

        return {
            status: true,
            message: "sent getbalance request, please receive the informations from callback function"
        }
    } else {
        // send request in nodejs
        return {
            status: false,
            message: "it doesn't work in backend mode yet"
        }
    }
}

function getWalletVersion(onMessageReceived) {
    if (typeof window !== "undefined") {
        if (typeof onMessageReceived !== 'function') {
            return {
                status: false,
                message: "`onMessageReceived` parameter should be a callback function"
            }
        }
        // browser mode
        window.postMessage({source: "hathorpay-gateway", message: "EXTERNAL_GET_WALLET_VERSION", payload: ""}, "*");

        // window.addEventListener("message", (event) => {
        window.onmessage = (event) => {
            // console.log("event listener for EXTERNAL_GET_WALLET_VERSION", event);
            if (event['data']['message'] === "EXTERNAL_GET_WALLET_VERSION_RESPONSE" && event['data']['source'] === "hathorpay-gateway") {
                onMessageReceived(event['data']['response']);
            }
        };

        return {
            status: true,
            message: "sent request, please receive the informations from callback function"
        }
    } else {
        // send request in nodejs
        return {
            status: false,
            message: "it doesn't work in backend mode yet"
        }
    }
}

$(document).ready(function() {
    connect(function(response) {
        console.info(response);
        if(response.status) {
            getBalance("00", function(response) {
                console.info(response);
            })
        }
    })
})
