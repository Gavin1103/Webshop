import {css} from "lit-element";

export default css`
    .popup-content h3 {
        margin: 0 0 15px;
        font-size: xx-large;
        font-weight: bolder;
        color: #353535;
    }

    .popup-content p {
        margin: 0 0 20px;
        font-size: large;
        font-weight: lighter;
        color: #989898;
    }

    /* Buttons */
    .btn {
        padding: 10px 20px;
        margin: 0 10px;
        border: none;
        border-radius: 4px;
        font-size: large;
        cursor: pointer;
    }

    .btn-confirm {
        background-color: #FF2F00;
        color: white;
    }

    .btn-cancel {
        background-color: #777FE5;
        color: white;
    }
`;
