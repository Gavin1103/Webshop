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
        margin: 10px;
        padding: 10px;
        border-radius: 20px;
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
        border-radius: 10px;
        width: 20vw;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s, transform 0.3s;
        
        .product-image{
            border-radius: 10px 10px 0 0;
            width: 20vw;
            height: 30vh;
            object-fit: cover;
        }
        
    }
    
    
    .products-card:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    
    
    .product-info {
        display: flex;
        flex-direction: column;
        padding: 10px;
        
        .info-left {
            display: flex;
            flex-direction: column;
            
            .name {
                font-size: xx-large;
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
            flex-direction: column;
            
            .price {
                font-size: x-large;
                color: #FF2F00;
                font-weight: bolder;
            }
        }
    }
    
`;