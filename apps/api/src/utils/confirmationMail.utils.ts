export const CONFIRMATION_SUBJECT =
  'Activate your account in our PingPong Challenge!';

export const generateConfLinkHTML = (link: string) => `
<h3>Confirm your account!</h3>
<p>Click the following link:</p>
<a href='${link}'>Confirm account</a>
`;

export const RESET_PASSWORD_SUBJECT = 'Reset you password';

export const generateResetPasswordLinkHTML = (link: string) => `
<h3>You requested to reset your password</h3>
<p>Click the following link to reset your password:</p>
<a href='${link}'>Reset password procedure</a>
`;
