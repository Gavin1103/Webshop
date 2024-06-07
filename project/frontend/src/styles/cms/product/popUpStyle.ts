import {css} from "lit-element";

export default css`
    :host {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100% ;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
    }

    :host([open]) {
        display: flex;
    }

    .popup-content {
        position: relative;
        background: white;
        padding: 20px;
        border-radius: 5px;
    }
    
    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
    .title{
        font-weight: lighter;
        font-size: xx-large;
    }
    
    .input-element {
        display: flex;
        flex-direction: column;
        margin: 10px;
        label {
            margin-bottom: 5px;
        }
    }
    
    .input-element input,
    .input-element select,
    .input-element option {
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 8px;
    }

    .input-with-button {
        display: flex;
        flex-direction: row;
        
        input {
            border-radius: 0;
            width: 70%;
            border: 1px solid #ccc;
        }
        
        button {
            border: 1px solid #ccc;
        }
    }
    
    .label-imageURL {
        margin: 10px;
    }

    textarea {
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 5px;
    }
    
    .elements {
        display: flex;
        flex-direction: row;
    }

    .image-list {
        display: flex;
        flex-direction: column;
    }
    
    .existImageURL {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 8px;
    }
    
    .imageURL{
        background-color: #E6E6E6;
        padding: 10px;
        border-radius: 20px;
    }
    
    .buttons {
        display: flex;
        justify-content: end;
    }
    
    .btn-save {
        padding: 5px 10px;
        margin: 2px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        background-color: #373E98;
        color: white;
    }
`;
