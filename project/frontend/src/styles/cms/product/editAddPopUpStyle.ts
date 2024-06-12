import {css} from "lit-element";

export default css`
    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
    label {
        font-weight: bolder;
    }

    .title {
        font-weight: bolder;
        font-size: xx-large;
    }

    .input-element {
        display: flex;
        flex-direction: column;
        margin: 10px;
    }

    .input-element label {
        margin-bottom: 5px;
    }

    .input-element input,
    .input-element select,
    .input-element option {
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 8px;
    }

    .input-element input:focus,
    .input-element select:focus {
        border-color: #66afe9;
        box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
        outline: none;
    }

    .input-with-button {
        display: flex;
        flex-direction: row;
    }

    .input-with-button input {
        border-radius: 0;
        width: 70%;
        border: 1px solid #ccc;
    }

    .input-with-button button {
        border: 1px solid #ccc;
    }

    .label-imageURL {
        margin: 10px;
    }

    textarea {
        width: 100%;
        height: 150px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        font-family: Arial, sans-serif;
        line-height: 1.5;
        color: #333;
        background-color: #f9f9f9;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    textarea:focus {
        box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
        outline: none;
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

    .imageURL {
        background-color: #E6E6E6;
        padding: 10px;
        border-radius: 20px;
    }

    .buttons {
        display: flex;
        justify-content: end;
    }

    .btn-save {
        padding: 10px 20px;
        margin: 0 10px;
        border: none;
        border-radius: 4px;
        font-size: large;
        cursor: pointer;
        background-color: #777FE5;
        color: white;
    }
`;