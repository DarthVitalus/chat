(function() {
    'use strict';

    class FireBase {
        constructor (url) {
            this.url = url;
        }

        get (resource, callback, params) {
            if (!resource)
                throw new Error('You must specify what you are trying to get!');

            const req = new XMLHttpRequest();
            req.open('GET', this.url + resource + '.json', true);

            req.addEventListener('readystatechange',
                () => {
                    if (req.readyState !== 4) {
                        return;
                    }

                    const respData = JSON.parse(req.responseText);

					callback(respData, params);
                });

            req.send(JSON.stringify(params));
        }

        post(resource, data, callback) {
            if (!resource)
            throw new Error('You must specify what you are trying to get!');

            const req = new XMLHttpRequest();
            req.open('POST', this.url + resource + '.json', true);

            if (callback)
                req.addEventListener('readystatechange',
                    () => {
                        if (req.readyState !== 4) return;

                        const respData = JSON.parse(req.responseText);
                        callback(respData);
                    });

            req.send(JSON.stringify(data));
        }
    }

    window.FireBase = FireBase;
})();