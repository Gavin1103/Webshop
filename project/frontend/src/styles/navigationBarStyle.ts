import {css} from "lit";

export default css `
    .navigation {
        position: sticky;
        top: 0;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 50;
    }

    .sidebar {
        position: fixed;
        top: 8%;
        left: -40%;
        width: 40%;
        height: 100%;
        background: rgba(255, 255, 255, 0.10);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        transition: left 0.3s ease;
        z-index: 9999;
        overflow-y: auto;
    }

    .top-container-close {
        position: sticky;
        top: 10px;
        z-index: 2;
        display: flex;
        justify-content: end;
    }

    .close-button {
        margin-right: 2%;
        transition: transform 0.3s ease;
    }

    .close-button:hover {
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


    .links {
        width: 20%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    @media screen and (max-width: 600px) {
        .sidebar {
            left: -100%;
            width: 100%;
        }

        .icon {
            width: 24px;
            height: 24px;
            padding: 0 5px;
        }
    }
`;