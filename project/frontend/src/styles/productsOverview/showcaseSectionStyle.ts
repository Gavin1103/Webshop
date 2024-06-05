import {css} from "lit";

export default css`
    :host {
        display: flex;
        flex-direction: column;
    }
    
    .title {
        font-size: xx-large;
        font-weight: bolder;
    }
    
    .sub-title {
        font-size: xx-large;
        font-weight: lighter;
    }

    .filter-results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .result {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px;
        padding: 10px;
        border-radius: 40px;
        
        img {
            transition: transform 0.3s;
            transform: scale(0.8);
        }
        
        img:hover {
            transform: scale(1);
        }
    }
    
    .category-filter-result {
        background-color: #FFD169;
    }
    
    .priceRange-filter-result {
        background-color: #ECAE20;
    }
    
    .rating-filter-result {
        background-color: #FD7A5D;
    }
    
    .products-list-section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .products-card {
        margin: 20px;
        padding: 10px;
        border-radius: 10px;
        width: 18vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s, transform 0.3s;
        
        .product-image{
            border-radius: 10px 10px 0 0;
            width: 18vw;
            height: 30vh;
            object-fit: contain;
        }
        
    }

    .discount {
        display: flex;
        align-self: center;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        color: white;
        font-weight: bold;
        background-color: #FF2F00;
        justify-content: center;
        align-items: center;
    }
    
    
    .products-card:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    
    
    .product-info {
        display: flex;
        flex-direction: column;
        
        .info-left {
            display: flex;
            flex-direction: column;
            
            .info-top {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            
            .name {
                font-size: xx-large;
                font-weight: bolder;
                margin-top: 5px;
            }
            
            .description, .rating{
                font-size: large;
                font-weight: lighter;
                margin-top: 5px;
            }
        }
        
        .info-right {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            
            .price {
                display: flex;
                flex-direction: column;
                margin-top: 10px;
            }
            
            .current-price {
                font-size: x-large;
                color: #FF2F00;
                font-weight: bolder;
            }

            .original-price {
                font-size: medium;
                font-weight: lighter;
                text-decoration: line-through;
                color: #989898;
            }
            
            .cart-button {
                width: 30px;
            }
        }
    }

    @media (max-width: 600px) {
        .result {
            font-size: small;
            margin: 5px;
            padding: 7px;
        }
        
        .products-card {
            display: flex;
            flex-direction: row;
            width: 90vw;
            align-self: center;

            .product-image{
                border-radius: 10px 0 0 10px;
                width: 30vw;
                max-height: 20vh;
            }

            .discount {
                height: 30px;
                width: 30px;
                font-size: x-small;
                font-weight: bold;
                background-color: #FF2F00;
                justify-content: center;
                align-items: center;
            }
            .product-image {
                margin-right: 10px;
            }

            .product-info {
                display: flex;
                flex-direction: row;
                
                .info-top {
                    display: block;
                }

                .info-left {
                    .name {
                        font-size: x-large;
                    }
                    
                    .description, .rating{
                        font-size: medium;
                        font-weight: lighter;
                        width: 140%;
                    }
                }
            }
                .info-right {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .price {
                        font-size: medium;
                    }
                    
                    .cart-button {
                        align-self: end;
                    }
            }

        }
    }
    
`;