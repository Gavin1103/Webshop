import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from "lit/decorators.js";
import {} from "./UserEditModal";
import {UserResponse} from "../../../types/UserResponse";
import {UserService} from "../../../services/UserService";
import {css} from "lit-element";

@customElement("user-table")
export class UserTable extends LitElement {
    userService: UserService = new UserService();

    static styles = css`
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #ddd;
    }
        
    .save-btn {
        background-color: #ECAE20;
        border: solid 1px #ECAE20;
        color: white;
        border-radius: 5px;
        width: 90%;
        cursor: pointer;
    }
        
    .delete-btn {
        background-color: #FF0000;
        border: solid 1px #FF0000;
        color: white;
        border-radius: 5px;
        width: 90%;
        cursor: pointer;
    }
`;

    @property({type: Array})
    users: UserResponse[] = [];

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();

        this.users = await this.userService.getAllUsers();
    }

    private async deleteUser(user: UserResponse): Promise<void> {
        if (confirm('Are you sure you want to delete this user?')) {
            await this.userService.deleteUser(user.email);
            this.users = this.users.filter(u => u.userId !== user.userId);
            this.requestUpdate();
        }
    }

    private editUser(user: UserResponse): void {
        const modal: any = this.shadowRoot?.querySelector('user-edit-modal');
        if (modal) {
            modal.user = user;
            modal.open = true;
        }
    }

    protected render(): TemplateResult {
        return html`
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${this.users.map(user => html`
                    <tr>
                        <td>${user.userId}</td>
                        <td>${user.firstname}</td>
                        <td>${user.lastname}</td>
                        <td>${user.username}</td>
                        <td>${user.roles[0].name}</td>
                        <td>${user.email}</td>
                        <td>${user.phonenumber}</td>
                        <td><button class="save-btn" @click="${() => this.editUser(user)}">Edit</button></td>
                        <td><button class="delete-btn" @click="${() => this.deleteUser(user)}">Delete</button></td>
                    </tr>
                `)}
            </tbody>
        </table>
        <user-edit-modal></user-edit-modal>
    `;
    }
}