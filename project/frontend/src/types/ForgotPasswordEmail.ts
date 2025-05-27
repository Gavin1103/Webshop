
export class ForgotPasswordEmail {
    private username: string = "";
    private resetToken: string = "";

    public constructor (username: string, resetToken: string)
    {
        this.username = username;
        this.resetToken = resetToken;
    }

    public generateEmail(): string {
        return `
    <h1>Reset Password</h1>
    <p>Dear ${this.username},</p>
    <p>We received a request to reset your password. Please click the link below to reset your password:</p>
    <a style=" width: 200px; text-decoration: none; color: black; padding: 5px; margin: 10px 0; border: 1px solid #ECAE20; border-radius: 10px; cursor: pointer; background-color: #ECAE20;" href="${viteConfiguration.WEBSHOP_URL}/#/reset-password/${this.resetToken}">Reset Password</a>
    <p>If you did not request to reset your password, please ignore this email.</p>
    <p>Kind regards,</p>
    <p>Webshop</p>
    `;
    }
}