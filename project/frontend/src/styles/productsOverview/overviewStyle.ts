import {css} from "lit";

export default css `
    :host {
        margin-top: 10vh;
        display: flex;
        flex-direction: column;
    }
    
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .header-back-button {
        background-color: transparent;
        border: none;
        font-size: large;
        padding: 0;
    }
    
    main {
        display: flex;
        flex-direction: row;

        filter-section {
            margin-right: 5vw;
        }
    }
    
`;