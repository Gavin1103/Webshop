import {UserRegisterFormModel} from "./UserRegisterFormModel";

export class RegistrationEmail {
    private username: string = "";
    private email: string = "";
    private phoneNumber: string = "";
    private firstname: string = "";
    private lastname: string = "";
    private confirmationToken: string = "";

    public constructor (userRegisterModel: UserRegisterFormModel, confirmationToken: string)
    {
        this.username = userRegisterModel.username;
        this.email = userRegisterModel.email;
        this.phoneNumber = userRegisterModel.phoneNumber;
        this.firstname = userRegisterModel.firstname;
        this.lastname = userRegisterModel.lastname;
        this.confirmationToken = confirmationToken;
    }

    public generateEmail(): string {
        return `
    <h1>Email Confirmation</h1>
    <p>Dear ${this.firstname} ${this.lastname},</p>
    <p>Thank you for registering with our webshop. Please confirm your email address by clicking the link below:</p>
    <a style=" width: 200px; text-decoration: none; color: black; padding: 5px; margin: 10px 0; border: 1px solid #ECAE20; border-radius: 10px; cursor: pointer; background-color: #ECAE20;" href="${viteConfiguration.WEBSHOP_URL}/#/confirmation/${this.confirmationToken}">Confirm Email</a>
    <p>Here are your details:</p>
    <table style="width:100%; border: 1px solid black; border-collapse: collapse;">
        <tr>
            <th style="border: 1px solid black; padding: 15px; text-align: left;">Username</th>
            <td style="border: 1px solid black; padding: 15px; text-align: left;">${this.username}</td>
        </tr>
         <tr>
            <th style="border: 1px solid black; padding: 15px; text-align: left;">Firstname</th>
            <td style="border: 1px solid black; padding: 15px; text-align: left;">${this.firstname}</td>
        </tr>
         <tr>
            <th style="border: 1px solid black; padding: 15px; text-align: left;">Lastname</th>
            <td style="border: 1px solid black; padding: 15px; text-align: left;">${this.lastname}</td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 15px; text-align: left;">Email Address</th>
            <td style="border: 1px solid black; padding: 15px; text-align: left;">${this.email}</td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 15px; text-align: left;">Phone Number</th>
            <td style="border: 1px solid black; padding: 15px; text-align: left;">${this.phoneNumber}</td>
        </tr>
    </table>
    <p>If you did not register for our webshop, please ignore this email.</p>
    <p>Kind regards,</p>
    <p>Webshop</p>
    `;
    }
}