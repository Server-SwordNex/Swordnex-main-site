const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// NO TEMPLATE - Direct Content
sendSmtpEmail.subject = "Test Email from Code - Simple Text";
sendSmtpEmail.htmlContent = "<html><body><h1>This is a direct test content</h1><p>If you see this, the API key and sender are working. The issue might be with Template ID 9.</p></body></html>";
sendSmtpEmail.sender = { email: "deviseethala62@gmail.com", name: "SwordNex Test" };
sendSmtpEmail.to = [{ email: "deviseethala62@gmail.com", name: "Test User" }];

console.log("Attempting to send SIMPLE email (no template)...");

apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('SUCCESS: Simple email accepted.');
    console.log('MessageId:', data.messageId);
}, function (error) {
    console.error('ERROR Sending Simple Email:');
    console.error(error);
});
