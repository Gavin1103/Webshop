import {css} from "lit";

export default css `
    :host{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10%;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 275px;
    }

    .form-input {
        width: 100%;
        padding: 5px;
        margin: 5px 0;
        border: 1px solid lightgray;
        border-radius: 5px;
    }
    
    .form-submit {
        width: 95%;
        padding: 5px;
        margin: 10px 0;
        border: 1px solid #ECAE20;
        border-radius: 10px;
        cursor: pointer;
        background-color: #ECAE20;
    }

    .form-title {
        margin-bottom: 2px;
    }

    .form-message{
        margin-top: 0;
        margin-bottom: 5px;
    }

    .form-redirect-message{
        a {
            color: #ECAE20;
            font-weight: bold;
            text-decoration: none;
            cursor: pointer;
        }
    }

    .strength-bar {
        display: flex;
        flex-direction: row;
        gap: 5px;
        height: 12px;
        width: 100%;
        transition: width 0.5s ease, background-color 0.5s ease;
    }

    .strength-wrapper {
        padding: 2px;
        width: 100%;
    }

    .password-strength-text{
        text-align: end;
        font-weight: bold;
    }

    .strength-item {
        height: 12px;
        width: 25%;
        border-radius: 25px;
    }
`;