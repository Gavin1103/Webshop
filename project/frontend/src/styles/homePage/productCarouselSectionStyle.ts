import {css} from "lit";

export default css`
    :host {
        margin-top: 5vh;
        width: 90vw;
        align-self: center;
    }

    .title {
        font-weight: bolder;
        font-size: xx-large;
    }

    .header-actions {
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    .header-actions:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }

    .action-text {
        font-weight: lighter;
        font-size: large;
        white-space: nowrap;
    }


    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .product-carousel {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        scrollbar-width: none;
    }

    .product-card {
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        margin: 20px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .product-image {
        width: 250px;
        height: 250px;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
        margin-bottom: 10px;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .product-name {
        font-size: large;
        font-weight: bold;
        color: #000000;
    }

    .product-price {
        margin-top: 5px;
        font-size: medium;
        font-weight: bolder;
        color: #FF2F00;
    }

    .add-to-cart-button {
        cursor: pointer;
        position: absolute;
        bottom: 10px;
        right: 5px;
        width: 30px;
        height: 30px;
    }

    .product-card:hover {
        transform: scale(1.03);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .add-to-cart-button:hover {
        filter: brightness(20%);
    }

    @media screen and (max-width: 600px) {
        .product-image {
            width: 150px;
            height: 150px;
        }

        .product-card {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            margin: 10px;
        }

        .title {
            font-size: large;
        }
        
        .action-text {
            font-size: medium;
        }
        
        .product-name {
            font-size: medium;
        }
        
        .product-price {
            font-size: small;
        }

        .add-to-cart-button {
            display: none;
        }
        
        
    }
`;