import {css} from "lit";

export default css `
    :host {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 100;
    }

    .feedback-buttons {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
    }

    .feedback-button {
        width: 4rem;
        height: 4rem;
        background-color: #495AFF;
        border-radius: 50%;
        border: none;
        padding: 0;
        cursor: pointer;
        color: #ffffff;
    }

    .icon-button {
        width: 2rem;
        height: 2rem;
        margin: 1rem;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 101;
    }

    .message {
        background: white;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .message.error {
        background-color: #ffcccc;
    }

    .message.success {
        background-color: #ccffcc;
    }
`;