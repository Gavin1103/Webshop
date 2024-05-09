import {css} from "lit";

export default css`
    :host {
        margin-top: 5vh;
        width: 90vw;
        align-self: center;
    }

    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .header-text {
        font-size: xx-large;
        font-weight: bolder;
        align-items: flex-start;
    }

    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
        margin: 10px auto;
    }

    .category-card {
        position: relative;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        width: 300px;
        height: 300px;
        margin-top: 10px;
    }

    .category-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

    .more-info-button {
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 200px;
        height: 200px;
        background-color: rgba(227, 227, 227, 0.5);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        border-radius: 100% 0 0 0;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s, box-shadow 0.3s;;
        transform-origin: bottom right;
        transform: scale(0.8);
        box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
    }


    .more-info-button:hover {
        transform: scale(1);
        box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.4);
    }

    .category-name {
        font-size: x-large;
        font-weight: bolder;
        color: #353535;
    }

    @media screen and (min-width: 601px) and (max-width: 1024px) {
        .category-grid {
            display: grid;
            grid-gap: 5px;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }

        .category-card {
            width: 200px;
            height: 200px;
            margin-top: 10px;
        }

        .more-info-button {
            width: 150px;
            height: 150px;
        }

        .category-name {
            font-size: large;
            font-weight: bolder;
        }
    }

    @media screen and (max-width: 600px) {
        .header-text {
            font-size: large;
        }

        .category-grid {
            display: grid;
            grid-gap: 5px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }

        .category-card {
            width: 160px;
            height: 160px;
            margin-top: 10px;
        }

        .more-info-button {
            width: 120px;
            height: 120px;
        }

        .category-name {
            font-size: medium;
            font-weight: bolder;
        }

    }
`;