import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from "lit/decorators.js";
import {UserResponse} from "../../../types/UserResponse";
import {css} from "lit-element";
import {UserService} from "../../../services/UserService";

@customElement("user-edit-modal")
export class UserEditModal extends LitElement {
    userService: UserService = new UserService();

    @property({type: Object})
    user: UserResponse | null = null;

    @property({type: Object})
    onUpdate: (user: UserResponse) => void = () => {};

    @property({type: Boolean})
    open: boolean = false;

    static styles = css`
        .modal {
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #fefefe;
            width: 25%;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
        }

        .form-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px 10%;
        }

        .form-group > label {
            display: flex;
            flex-direction: column;
        }
        
        .form-label {
            margin-top: 10px;
            font-weight: bold;
        }

        .form-input {
            margin-top: 3px;
            padding: 10px;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
            border: white;
            border-radius: 5px;
        }

        .submit-btn-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        .submit-btn {
           background-color: #ECAE20;
           padding: 10px;
           border: none;
           border-radius: 10px;
           color: white;
           font-weight: bold;
           cursor: pointer;
            width: 100px;
            font-size: 1rem;
        }
        
        .btn-close {
            float: right;
            color: black;
            border: 1px solid black;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
    `;

    private updateUser(e: Event): void {
        e.preventDefault();
        this.open = false;
        this.onUpdate(this.user!);
    }

    protected render(): TemplateResult {
        return html`
            <div class="modal" style="display: ${this.open ? 'block' : 'none'}">
                <div class="modal-content">
                    <button @click="${() => this.open = false}" class="btn-close">X</button>
                    <h2 style="text-align: center">Edit User</h2>
                    <form @submit="${this.updateUser}">
                        <div class="form-group">
                            <label class="form-label">
                                First Name:
                                <input type="text" class="form-input" .value="${this.user?.firstname || ''}"
                                       @input="${(e: InputEvent) => this.user!.firstname = (e.target as HTMLInputElement).value}">
                            </label>
                            <label class="form-label">
                                Last Name:
                                <input type="text" class="form-input" .value="${this.user?.lastname || ''}"
                                       @input="${(e: InputEvent) => this.user!.lastname = (e.target as HTMLInputElement).value}">
                            </label>
                            <label class="form-label">
                                Username:
                                <input type="text" class="form-input" .value="${this.user?.username || ''}"
                                       @input="${(e: InputEvent) => this.user!.username = (e.target as HTMLInputElement).value}">
                            </label>
                            <label class="form-label">
                                Email:
                                <input type="email" class="form-input" .value="${this.user?.email || ''}"
                                       @input="${(e: InputEvent) => this.user!.email = (e.target as HTMLInputElement).value}">
                            </label>
                            <label class="form-label">
                                Phone Number:
                                <input type="tel" class="form-input" .value="${this.user?.phonenumber || ''}"
                                       @input="${(e: InputEvent) => this.user!.phonenumber = (e.target as HTMLInputElement).value}">
                            </label>
                            <label class="form-label">
                                Roles:
                                <select class="form-input"
                                        @change="${(e: Event) => this.user!.roles[0].name = (e.target as HTMLSelectElement).value}">
                                    <option value="USER" ?selected="${this.user?.roles[0].name === 'USER'}">
                                        User
                                    </option>
                                    <option value="ADMIN" ?selected="${this.user?.roles[0].name === 'ADMIN'}">
                                        Admin
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="submit-btn-container">
                            <button class="submit-btn" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}