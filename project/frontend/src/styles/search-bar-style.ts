import {css} from "lit";

export default css `
    .search-bar {
        display: flex;
        flex-direction: column;
    }

    .search-input {
        display: flex;
        min-width: 300px;
        align-items: center;
        justify-content: space-between;
        border-radius: 50px;
        margin: 5px 0;
        background: rgba(180, 180, 180, 0.6);
        backdrop-filter: blur(10px);
        transition: transform 0.3s ease;

        input[type="text"] {
            border: none;
            outline: none;
            background: none;
            width: 100%;
            height: 100%;
            font-size: large;
            padding: 0 20px;
        }
    }

    .search-input:hover {
        transform: scale(1.03);
    }

    .search-result {
        position: absolute;
        border-radius: 0 0 10px 10px;
        top: 10vh;
        width: 100%;
        max-width: 300px;
        max-height: 30vh;
        overflow-y: auto;
        z-index: 999;
        background: #FFFFFF;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .result {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        font-size: large;
        transition: transform 0.3s ease, background 0.8s ease;
    }

    .result:hover {
        background: #D9D9D9;
        transform: scale(1.05);

        .redirect-icon {
            display: block;
        }
    }

    .redirect-icon {
        transition: transform 0.3s ease;
        display: none;
    }

    .redirect-icon:hover {
        transform: scale(1.1);
    }

    .icon {
        width: 40px;
        height: 40px;
        padding: 0 5px;
        transition: transform 0.3s ease;
        cursor: pointer;
    }

    .icon:hover {
        transform: scale(1.1);
    }


    @media screen and (max-width: 600px) {
        .icon {
            width: auto;
            height: 35px;
            padding: 0 5px;
        }
    }
`;
