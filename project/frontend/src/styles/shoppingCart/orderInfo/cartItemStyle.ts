import {css} from "lit";

export default css `
    .item-wrapper {
        width: 608px;
        height: 100px;
        margin: 2rem auto;
        background: #FFFFFF;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
    }

    .container {
        display: flex;
        align-items: center;
    }

    .image {
        padding-top: 10px;
        padding-left: 10px;
    }

    .image-item {
        width: 80px;
        height: 80px;
        border-radius: 8px;
    }

    .info {
        padding-left: 15px;
        line-height: 10px;
    }

    .title {
        width: 300px;

        font-style: normal;
        font-weight: 600;
        font-size: 18px;

        color: #1E1E1E;
    }

    .type {
        font-size: 14px;
    }

    .quantity {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 4rem;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
    }

    .price {
        padding-left: 1.5rem;
        width: 3rem;
    }

    .delete-button {
        padding-left: 1.5rem;
        cursor: pointer;
    }
`;