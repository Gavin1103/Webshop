import {css} from "lit-element";

export default css`
    :host {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: blurIn 0.5s forwards;
    }

    @keyframes blurIn {
        from {
            backdrop-filter: blur(0);
        }
        to {
            backdrop-filter: blur(10px);
        }
    }

    @keyframes blurOut {
        from {
            backdrop-filter: blur(10px);
        }
        to {
            backdrop-filter: blur(0);
        }
    }

    @keyframes backgroundFadeOut {
        from {
            background-color: rgba(0, 0, 0, 0.5);
        }
        to {
            background-color: rgba(0, 0, 0, 0);
        }
    }

    @keyframes popupIn {
        from {
            transform: scale(0.7);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes popupOut {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0.2);
            opacity: 0;
        }
    }

    :host([open]) {
        display: flex;
        animation: blurIn 0.5s forwards;
    }

    :host([closing]) {
        animation: backgroundFadeOut 0.5s forwards, blurOut 0.5s forwards;
    }

    .popup-content {
        position: relative;
        background: white;
        padding: 20px;
        border-radius: 5px;
        animation: popupIn 0.3s forwards;
    }

    :host([closing]) .popup-content {
        animation: popupOut 0.5s forwards;
    }

`;
