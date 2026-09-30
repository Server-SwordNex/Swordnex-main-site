const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; // I'll run this with the key loaded

const apiInstance = new SibApiV3Sdk.AccountApi();

apiInstance.getAccount().then(function (data) {
    console.log('API Key is VALID. Account Name: ' + data.companyName);
    console.log('Email: ' + data.email);
}, function (error) {
    console.error('API Key Check Failed: ' + error);
});

const sendersApi = new SibApiV3Sdk.SendersApi();
sendersApi.getSenders().then(function (data) {
    console.log("--- Verified Senders ---");
    data.senders.forEach(s => {
        console.log(`Email: ${s.email} | Name: ${s.name} | Active: ${s.active}`);
    });
}, function (error) {
    console.error("Could not fetch senders:", error);
});
