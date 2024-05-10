import {css} from "lit";

export default css `    
    .payment-wrapper {
        display: flex;
        flex-direction: row;
    }
    
    .left-payments {
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    .right-payments {
        display: flex;
        flex-direction: column;
        width: 50%;
    }
   
    .input-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .payment-input {
        width: 1.5rem;
        height: 1.5rem;
        accent-color: #495AFF;
    }
    
    .payment-label {
        display: flex;
        align-items: center;
    }
    
    .payment-logo {
        margin: auto 10px;
    }
`;