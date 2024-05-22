import {css} from "lit";

export default css `
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