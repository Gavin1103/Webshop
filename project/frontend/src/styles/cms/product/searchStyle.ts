import {css} from "lit-element";

export default css`
    @media (min-width: 768px) {
        .search-input {
            width: 50vh;
        }
    }
    
    .search-bar {
        display: flex;
        flex-direction: column;
    }

    .search-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        margin: 5px 0;
        backdrop-filter: blur(10px);
        transition: transform 0.3s ease;
        background-color: #ecf0f1;
        height: 40px;
        box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
        inset -2px -2px 5px rgba(255, 255, 255, 0.7);

        input[type="text"] {
            border: none;
            outline: none;
            background: none;
            width: 100%;
            height: 100%;
            font-size: small;
            padding: 0 10px;
        }
    }

    .search-input:hover {
        transform: scale(1.01);
    }

    .icon {
        width: 25px;
        height: 25px;
        padding: 0 5px;
        transition: transform 0.3s ease;
        cursor: pointer;
        margin-left: 5px;
    }

    .icon:hover {
        transform: scale(1.1);
    }
`;