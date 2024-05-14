import {css} from "lit";

export default css `
    .summary-wrapper {
        width: 400px;
        height: 100%;
        background: #FFFFFF;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
    }

    .content-container {
        padding: 1.5rem;
    }

    .title {
        margin-top: 0;
        margin-bottom: 0;
    }

    .summary-item {
        display: flex;
        height: 1.5rem;
        margin: .5rem 0;
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
        flex-direction: row;
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

    .apply-discount {
        border-radius: 4px;
        border: 1px solid #1E1E1E;
        background-color: #353935;
        color: white;
    }

    .overview-button {
        width: 50%;
        margin: auto 0 auto auto;
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

    .discount-input {
        display: flex;
        margin-top: 1rem;
        gap: .5rem;
    }

    .total-price {
        display: flex;
        flex-direction: column;
    }

    .price-items {
        height: 1rem;
        line-height: 1rem;
        margin: 0;
    }

    .price {
        font-size: 1.5rem;
        line-height: 1.5rem;
        margin: 0.5rem 0;
        font-weight: bold;
        color: #393939;
    }

    .summary-item-text {
        margin: 0;
    }

    .item-price {
        margin-left: auto;
    }
`;

