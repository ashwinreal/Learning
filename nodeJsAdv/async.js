const https = require('https');

const start = Date.now();

function doReq() {
    https.request('https://www.google.com', (res) => {
        res.on('data', () => {

        });
        res.on('end', () => {
            console.log(Date.now() - start);
        })
    }).end()
}

doReq();
doReq();
doReq();
doReq();
doReq();
doReq();

// here all the http calls are delegated to the Os so threadpool is not used

