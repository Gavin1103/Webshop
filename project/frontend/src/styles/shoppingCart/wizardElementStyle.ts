import {css} from "lit";

export default css `
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: none; /* Prevents flexbox from resizing it */
    }

    .step {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        background: #ffffff;
        border: 3px solid #ABB7C2;
        color: #ABB7C2;
        text-align: center;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .completed {
        background: rgba(73, 90, 255, 0.1);
        border: 3px solid #495AFF;
        color: #495AFF;
        font-weight: bolder;
    }

    .active {
        background: #495AFF;
        border: 3px solid #495AFF;
        color: white;
    }

    .label {
        margin-top: 10px;
        font-size: 16px;
        color: black;
    }

    .solid-background {
        cursor: pointer;
        background: #ffffff;
    }

    .label-active {
        color: #495AFF;
    }

    .label-completed {
        color: black;
    }

    .label-inactive {
        color: #ABB7C2;
    }
`;