import {css} from "lit";

export default css `
    .summary-wrapper {
        width: 350px;
        height: 100%;
        background: #FFFFFF;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
    }

    .content-container {
        padding: 1rem;
    }

    .title {
        margin-top: 0;
        margin-bottom: 0;
    }

    .summary-item {
        display: flex;
        height: 2.5rem;
    }

    .item-price {
        margin-left: auto;
    }

    .button-container {
        display: flex;
        margin-top: 2rem;
        gap: 2rem;
        justify-content: space-evenly;
    }
    
    .overview-button-container {
        flex-direction: column;
        gap: 1rem;
    }

    .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        gap: 15px;
        width: 8rem;
        height: 3rem;
        border-radius: 30px;
        cursor: pointer;
    }
    
    .overview-button {
        width: calc(100% - 5rem);
        margin: auto;
    }

    .next-button {
        font-size: 18px;
        display: flex;
        align-items: center;
        border: 0;
        color: #FFFFFF;
        background: #495AFF;
    }

    .prev-button {
        border: 1px solid #5F6368;
        font-size: 18px;
        display: flex;
        align-items: center;
        color: #393939;
        background-color: #ffffff;
    }

    .next-arrow {
        max-width: 3rem;
    }
`;

