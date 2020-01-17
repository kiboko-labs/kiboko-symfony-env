let env = 'prod';

var browser = browser || chrome;

browser.runtime.onMessage.addListener(message => {
    env = message.env;
});

browser.runtime.onStartup.addListener((browser) => {
    browser.runtime.sendMessage({"env": env});
});

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
        urls: [
            "*://*.develop/*",
            "*://*.local/*",
            "*://localhost/*"
        ]
    },
    [
        'requestHeaders',
        'blocking'
    ]
);

