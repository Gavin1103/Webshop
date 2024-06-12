import { css } from "lit-element";

export default css`
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    .btn {
        padding: 5px 10px;
        margin: 2px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color:white;
        background-color: #373e98;

    }

    .btn-change {
        background-color: #373e98;
        color: white;
    }

    .btn-delete {
        background-color: #ff2f00;
        color: white;
    }

    .btn-add {
        background-color:#ECAE20;
        color: white;
    }

    .go-back-btn {
        color: blue;
        cursor: pointer;
        font-size: inherit;
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
`;
