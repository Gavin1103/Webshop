import {css} from "lit";

export default css `
    :host {
        margin-top: 10vh;
        display: flex;
        flex-direction: column;
        align-content: center;
    }
    
    .header {
        display: flex;
        flex-direction: column;
        
        .back, .filter {
            display: flex;
            align-content: center;
            margin: 10px;
        }
    }

    .header-back-button {
        background-color: transparent;
        border: none;
        font-size: large;
        padding: 0;
    }

    .header-filter-button {
        font-size: large;
        font-weight: bolder;
        padding: 10px;
        background-color: #FFD169;
        border: none;
        border-radius: 30px;
        transition: transform 0.3s;
    }

    .header-filter-button:hover {
        transform: scale(1.1);
    }
    
    
    main {
        display: flex;
        flex-direction: row;

        filter-section {
            margin-right: 5vw;
        }
    }

    @media (max-width: 600px) {
        main {
            filter-section {
                margin: 0;
                position: absolute;
                z-index: 1000;
            }
        }
    }
    
`;