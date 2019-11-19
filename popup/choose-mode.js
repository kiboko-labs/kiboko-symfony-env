document.querySelectorAll('#popup-content > .env').forEach(element => {
    element.addEventListener('click', (event) => {
        let env = event.target.closest('#popup-content > .env').dataset.env;

        browser.runtime.sendMessage({'env': env});

        switch (env) {
            case 'dev':
                browser.browserAction.setIcon({path: '../icons/symfony-dev.png'});
                break;

            case 'xdebug':
                browser.browserAction.setIcon({path: '../icons/symfony-xdebug.png'});
                break;

            default:
                browser.browserAction.setIcon({path: '../icons/symfony.png'});
                break;
        }

        document.querySelectorAll('#popup-content > .env').forEach(element => {
            if (element.dataset.env === env) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    });
});