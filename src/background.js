// you can add sites to mapping. map values are weights.
var referrersWeights = {
    "https://www.google.com/" : 1
}

var referrers = [];

for (var site in referrersWeights) {
    if (referrersWeights.hasOwnProperty(site)) {
        var weight = referrersWeights[site];
        for (i = 0; i < weight; i++) {
            referrers.push(site);
        }
    }
}

function getRandomElement(items) {
    return items[ Math.floor(Math.random() * items.length) ];
};

function rewriteReferrer(e) {
    var present = false;
    for (var header of e.requestHeaders) {
        if (header.name.toLowerCase() === "referer") {
            header.value = getRandomElement(referrers);
            present = true;
        }
    }

    if (!present) {
        e.requestHeaders.push({
            name: "Referer",
            value: getRandomElement(referrers)
        });
    }

    return {requestHeaders: e.requestHeaders};
};

var requestFilter = {
    urls: ["<all_urls>"]
};

var extraInfoSpec = ["blocking", "requestHeaders"];

chrome.webRequest.onBeforeSendHeaders.addListener(
    rewriteReferrer,
    requestFilter,
    extraInfoSpec
);