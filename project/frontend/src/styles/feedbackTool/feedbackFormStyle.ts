import {css} from "lit";

export default css `
    :host {
        min-height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
    }

    .form-wrapper {
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }

    form {
        position: absolute;
        z-index: 100;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        background: white;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        width: 500px;
    }

    textarea {
        padding: 10px;
        resize: vertical;
        height: 100px;
        margin-bottom: 10px;
    }

    button {
        align-self: flex-start;
    }

    .screenshot-box {
        border: 1px solid #000;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 2rem;
    }
    
    img {
        width: 100%;
        max-height: 15rem;
        object-fit: contain;
        margin: auto;
        position: relative;
        display: flex;
    }

    .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        gap: 15px;
        width: 20rem;
        height: 3rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        border: 0;
        color: #FFFFFF;
        background: #495AFF;
        margin: auto;
    }
`;