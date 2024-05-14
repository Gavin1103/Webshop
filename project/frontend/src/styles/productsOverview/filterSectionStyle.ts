import {css} from "lit";

export default css `
    .filter-block {
        background-color: #FFD169;
        box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.3);
        padding: 10px;
        border-radius: 10px;
        margin-top: 20px;
        transition: box-shadow 0.3s, transform 0.3s;

        .title {
            font-weight: bolder;
            font-size: xx-large;
        }
    }

    .filter-block:hover {
        box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.3);
        transform: scale(1.05);
    }
    
    .price-input-button {
        display: flex;
        flex-direction: row;
        align-items: center;
    }


    .price-separator {
        font-size: x-large;
        font-weight: normal;
    }

    .price-range input[type="number"] {
        margin: 5px;
        font-size: large;
        font-weight: lighter;
        width: 40px;
        height: 29px;
        border: 1px solid #000000;
        background-color: transparent;
        border-radius: 4px;
    }

    .price-range input[type="number"]::-webkit-inner-spin-button,
    .price-range input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }

    .category-checkbox,
    .rating-stars{
        padding: 0;
        margin-top: 5px;
        list-style: none;
        font-weight: lighter;
        font-size: large;
    }

    .go-button {
        padding: 0 15px;
        margin: 0 10px;
    }
    
    .go-button:hover {
        transform: scale(1.5);
    }


    .category-checkbox input[type="checkbox"] {
        transform: scale(1.5);
        margin-right: 5px;
    }




`;