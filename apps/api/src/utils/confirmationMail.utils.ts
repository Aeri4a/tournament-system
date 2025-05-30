export const CONFIRMATION_SUBJECT =
  'Activate your account in our PingPong Challenge!';

export const generateConfLinkHTML = (link: string) => `
<h3>Confirm your account!</h3>
<p>Click the following link</p>
<a href='${link}'>Confirm account</a>
`;
