import {css} from "lit";

export default css `
    :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 200;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .spinner {
        border: 10px solid #f3f3f3;
        border-top: 10px solid black;
        border-radius: 50%;
        width: 75px;
        height: 75px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;