import {css} from "lit";

export default css `
    .input-label {
        font-weight: bold;
        font-size: 12px;
    }

    .input-field {
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        border: 0;
        width: 100%;
        height: 50px;
        background: #F7F7FB;
        border-radius: 4px;
        margin-top: .5rem;
        font-size: 10px;
    }

    .input-row {
        margin-top: 1.5rem;
        display: flex;
        gap: 2rem;
    }

    .input-container {
        width: 100%;
    }
    
    .discount-field {
        border: 1px solid #1E1E1E;
        font-size: 1rem;
        margin-top: 0;
    }
`;