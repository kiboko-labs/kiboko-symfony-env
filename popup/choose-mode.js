document.querySelectorAll('#popup-content > .env').forEach(element => {
    element.addEventListener("click", (event) => {
        let env = event.target.dataset.env;

        browser.runtime.sendMessage({"env": env});

        switch (env) {
            case "dev":
                chrome.browserAction.setIcon({path: "../icons/symfony-dev.png"});
                break;

            case "xdebug":
                chrome.browserAction.setIcon({path: "../icons/symfony-xdebug.png"});
                break;

            default:
                chrome.browserAction.setIcon({path: "../icons/symfony.png"});
                break;
        }
    });
});