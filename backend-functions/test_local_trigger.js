const fetch = require('node-fetch'); // You might need to install this if not present, or use built-in fetch in newer Node

// If node-fetch isn't available, we can use http module, but let's try assuming standard environment or use a simple http request.
const http = require('http');

const data = JSON.stringify({
    email: 'careers@swordnex.com',
    name: 'Test Local',
    interviewCode: 'TEST-LOCAL-123'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/trigger-email',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log('BODY: ' + body);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(data);
req.end();
