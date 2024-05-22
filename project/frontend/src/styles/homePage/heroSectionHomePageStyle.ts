import {css} from "lit";

export default css`
    .hero {
        position: relative;
        display: flex;
        background-color: #777FE5;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 70vw;
        height: 50vh;
        flex-direction: column;
        justify-content: center;
    }
    
    
    .title {
        color: #FFD169;
        text-align: center;
        font-weight: bolder;
        font-size: xx-large;
    }
    
    .sub-title {
        color: #ECAE20;
        text-align: right;
        font-weight: lighter;
        margin-right: 20%;
    }
    
    .more-info-button {
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 200px;
        height: 200px;
        background-color: #373E98;
        border-radius: 100% 0 0 0;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s, box-shadow 0.3s;;
        transform-origin: bottom right;
        transform: scale(0.8);
        box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);

        span{
            padding: 0;
            background-color: transparent;
            border: none;
            color: #FFD169;
            font-size: x-large;
            cursor: pointer;
        }

        @media screen and (max-width: 600px) {
            
        }
    }

    .more-info-button:hover {
        transform: scale(1);
        box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.4);
    }

    @media screen and (max-width: 600px) {
        .hero {
            width: 100vw;
            height: 40vh;
        }
        
        .more-info-button{
            width: 150px;
            height: 150px;
        }
    }

    @media screen and (min-width: 601px) and (max-width: 1024px) {
        .hero {
            width: 70vw;
            height: 50vh;
        }
    }
    
`;