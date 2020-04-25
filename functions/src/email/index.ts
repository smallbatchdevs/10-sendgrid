import * as functions from 'firebase-functions';

const sendgridApiKey = '';

export const sendEmail = functions.firestore.document(`contacts/{documentUid}`).onCreate(async (event: any) => {
  console.log(`event `, event);
  const contact: any = event.data();
  const welcomeEmail: any = {
    to: contact.email,
    from: '',
    templateId: '',
    dynamic_template_data: {
      firstName: contact.firstName
    }
  };
  return sendgridSendEmail(welcomeEmail);
});

function sendgridSendEmail(data: any): Promise<void> {
  console.log(`Sending email with data: `, data);
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(sendgridApiKey);
  return sgMail
    .send(data)
    .then((response: any[]) => console.log('Success sending email: ', response))
    .catch((error: any) => console.log('Error sending email: ', error));
}
