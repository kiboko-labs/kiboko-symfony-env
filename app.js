let env = 'prod';

var browser = browser || chrome;

browser.runtime.onMessage.addListener(message => {
    env = message.env;
});

browser.runtime.onStartup.addListener((browser) => {
    browser.runtime.sendMessage({"env": env});
});

if (!localStorage.getItem('urls')) {
    urls = [
        "*://*.develop/*",
        "*://*.local/*",
        "*://localhost/*"
    ];
    localStorage.setItem('urls', JSON.stringify(urls))
} else {
    urls = JSON.parse(localStorage.getItem('urls'));
}


browser.webRequest.onBeforeSendHeaders.addListener(
    details => {
        let requestHeaders = details.requestHeaders || [];
        requestHeaders.push({
            name: 'X-Symfony-Env',
            value: env
        });

        return {
            requestHeaders: requestHeaders
        };
    },
    {
        urls: urls
    },
    [
        'requestHeaders',
        'blocking'
    ]
);