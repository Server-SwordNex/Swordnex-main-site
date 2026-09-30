require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.templateId = 9;
sendSmtpEmail.to = [{ email: "deviseethala62@gmail.com", name: "Test User" }];
sendSmtpEmail.sender = { email: "careers@swordnex.com", name: "SwordNex Recruitment" };
sendSmtpEmail.params = {
    first_name: "Test User",
    email: "careers@swordnex.com",
    interview_code: "TEST-CODE-123"
};

console.log("Attempting to send test email...");

apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('SUCCESS: API called successfully.');
    console.log('MessageId:', data.messageId);
}, function (error) {
    console.error('ERROR:');
    console.error(error);
});
