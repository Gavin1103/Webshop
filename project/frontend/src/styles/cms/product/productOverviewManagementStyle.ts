import {css} from "lit-element";

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
    }
    .btn-change {
        background-color: #373E98;
        color: white;
    }
    .btn-delete {
        background-color: #FF2F00;
        color: white;
    }
`