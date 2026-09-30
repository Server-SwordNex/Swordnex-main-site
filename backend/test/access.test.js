const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { findPolicy } = require('../src/accessPolicy');

const serverSource = fs.readFileSync(path.join(__dirname, '../src/server.js'), 'utf8');
const routes = [...serverSource.matchAll(/app\.(get|post|put|delete)\(\s*'(\/api\/[^']*)'/g)].map(([, method, route]) => ({
    method: method.toUpperCase(),
    route,
}));

test('every /api route in server.js has an access policy', () => {
    assert.ok(routes.length > 50, `expected many routes, found ${routes.length}`);
    const missing = routes.filter(({ method, route }) => !findPolicy(method, route.replace(/:[^/]+/g, 'x')));
    assert.deepStrictEqual(missing, []);
});

test('no route is registered twice', () => {
    const seen = new Set();
    const dupes = routes.map(({ method, route }) => `${method} ${route}`).filter((key) => seen.has(key) || !seen.add(key));
    assert.deepStrictEqual(dupes, []);
});

test('literal segments win over parameters', () => {
    assert.strictEqual(findPolicy('GET', '/api/workshops/slug/abc').access, 'public');
    assert.deepStrictEqual(findPolicy('GET', '/api/workshops/abc/registrations').access, ['HR', 'Marketing']);
});

test('HTTP: private data needs login, unknown routes and bad webhooks are refused', async (t) => {
    const app = require('../src/server');
    const server = app.listen(0);
    t.after(() => server.close());
    const base = `http://127.0.0.1:${server.address().port}`;

    const expectStatus = async (method, url, status, headers = {}) => {
        const res = await fetch(base + url, { method, headers });
        assert.strictEqual(res.status, status, `${method} ${url}`);
    };

    await expectStatus('GET', '/api/contacts', 401);
    await expectStatus('GET', '/api/careers', 401);
    await expectStatus('GET', '/api/jobfair', 401);
    await expectStatus('GET', '/api/users', 401);
    await expectStatus('POST', '/api/users/create', 401);
    await expectStatus('DELETE', '/api/careers/abc', 401);
    await expectStatus('GET', '/api/blogs', 401);
    await expectStatus('GET', '/api/affiliate/dashboard?affiliateId=abc', 401);
    await expectStatus('GET', '/api/contacts', 401, { Authorization: 'Bearer not-a-real-token' });
    await expectStatus('GET', '/api/proxy-file?url=http://169.254.169.254/', 404);
    await expectStatus('POST', '/api/affiliate/record-conversion', 401, { 'x-affiliate-secret': 'guess' });
});

test('HTTP: CORS only allows SwordNex origins', async (t) => {
    const app = require('../src/server');
    const server = app.listen(0);
    t.after(() => server.close());
    const base = `http://127.0.0.1:${server.address().port}`;

    const preflight = (origin) =>
        fetch(`${base}/api/contacts`, { method: 'OPTIONS', headers: { Origin: origin, 'Access-Control-Request-Method': 'POST' } });

    assert.strictEqual((await preflight('https://swordnex.com')).headers.get('access-control-allow-origin'), 'https://swordnex.com');
    assert.strictEqual((await preflight('https://evil.example')).headers.get('access-control-allow-origin'), null);
});
