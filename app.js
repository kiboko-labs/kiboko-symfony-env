let env = 'prod';

browser.runtime.onMessage.addListener(message => {
    env = message.env;
    console.log(message.env);
});

chrome.webRequest.onBeforeSendHeaders.addListener(
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

