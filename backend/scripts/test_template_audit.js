require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// Force using TEMPLATE 9 to diagnose templating issues
sendSmtpEmail.templateId = 9;
sendSmtpEmail.to = [{ email: "deviseethala62@gmail.com", name: "Test Audit" }];
sendSmtpEmail.params = {
    first_name: "Test Audit User",
    email: "deviseethala62@gmail.com",
    interview_code: "AUDIT-999"
};

console.log("SENDING TEMPLATE 9 AUDIT...");

apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('SUCCESS: API Request Accepted.');
    console.log('MessageId:', data.messageId);

    // Now fetching the log for this specific message ID to see the status
    // Note: Logs might not be instantly available, but let's try or instruct user.
    console.log("---------------------------------------------------");
    console.log("Please check Brevo Dashboard -> Transactional -> Logs");
    console.log("Search for Message ID: " + data.messageId);
    console.log("If the status is 'Blocked', 'Soft Bounce', or 'Error', the details will be there.");
    console.log("---------------------------------------------------");

}, function (error) {
    console.error('API REQUEST ERROR:', error);
});
