import {css} from "lit";

export default css `
    :host {
        font-family: Arial, sans-serif;
    }

    .cms-container {
        display: flex;
        min-height: 100vh;
    }

    .content {
        flex: 1;
        padding: 20px;
        background-color: #ecf0f1;
    }

    .content h1 {
        margin-top: 0;
    }
`;