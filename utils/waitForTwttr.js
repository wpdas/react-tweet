export default function waitForTwttr() {
    return new Promise(function (resolve, reject) {
        var attempts = 0;
        function wait(interval) {
            setTimeout(function () {
                attempts += 1;
                // some logic to check if script is loaded
                // usually it something global in window object
                // @ts-ignore
                if (window['twttr'] !== undefined) {
                    return resolve(true);
                }
                if (attempts >= 10) {
                    return reject({ message: 'Timeout' });
                }
                wait(interval);
            }, interval);
        }
        // @ts-ignore
        if (window['twttr'] !== undefined) {
            return resolve(true);
        }
        wait(300);
    });
}
