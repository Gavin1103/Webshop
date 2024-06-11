import { css } from "lit";

export default css`
    button {
        width: 190px;
        height: 40px;
        border: none;
        background-color: var(--background-color, lightgrey);
        border-radius: 5px;
        color: white;
        font-size: 16px;
        transition: background-color 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    button:hover {
        cursor: pointer;
        background-color: var(--background-hover-color, lightgrey);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    button:active {
        background-color: var(--background-active-color, lightgrey);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;
