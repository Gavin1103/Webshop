import {css} from "lit";

export default css `
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
    }

    h1 {
        color: #333;
    }

    p {
        color: #666;
    }

    a {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        color: #fff;
        background-color: #007BFF;
        text-decoration: none;
        border-radius: 5px;
        cursor: pointer;
    }

    a:hover {
        background-color: #0056b3;
    }
`;