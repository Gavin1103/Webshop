import {css} from "lit";

export default css `
    .summary-wrapper {
        width: 350px;
        max-height: 350px;
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

    .align-right {
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
        border-radius: 5px;
    }

    .next-button {
        font-size: 18px;
        display: flex;
        justify-content: center;
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

    .next-icon {
        max-width: 1.25rem;
        max-height: 1.25rem;
    }

    .dots-icon {
        max-width: 5rem;
        max-height: 5rem;
        margin-right: .5rem;
        margin-left: .5rem;
    }

    .edit-button {
        border: 0;
        background-color: transparent;
        color: #495AFF;
        text-decoration: underline;
        cursor: pointer;
    }

    .item-title {
        font-weight: bold;
        margin: auto 0;
    }

    .title-item {
        height: 1rem;
        margin-bottom: .5rem;
    }

    .summary-section {
        margin-top: 1rem;
        margin-bottom: 3rem;
    }

    .summary-section p {
        height: 1.25rem;
        margin: 0;
    }

    .payment-option {
        display: flex;
        align-items: center;
    }

    .payment-icon {
        width: 2rem;
        height: 2rem;
        margin-left: .5rem;
    }
`;

