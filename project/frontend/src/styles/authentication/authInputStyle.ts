import {css} from "lit";

export default css `
    :host{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15%;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 250px;
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
        margin: 5px 0;
        border: 1px solid #ECAE20;
        border-radius: 10px;
        cursor: pointer;
        background-color: #ECAE20;
    }
`;