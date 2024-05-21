import {css} from "lit";

export default css `
    .filter-section {
        padding: 20px;
        border-radius: 10px;
        background-color: #E6E6E6;
        box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.3);
        width: 20vw;
        display: flex;
        flex-direction: column;
    }
    

    .close-button {
        align-self: end;
    }
    
    .filter-block {
        background-color: #FFFFFF;
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
    
    .filter-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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

    @media (max-width: 600px) {
        .filter-section {
            padding: 10px;
            width: 90vw;
        }
        
        .filter-block {
            padding: 10px;
            
            .title {
                font-size: large;
            }
        }

        .category-checkbox,
        .rating-stars{
            font-weight: lighter;
            font-size: medium;
        }

        .category-checkbox input[type="checkbox"] {
            transform: scale(1.2);
        }
    }



`;