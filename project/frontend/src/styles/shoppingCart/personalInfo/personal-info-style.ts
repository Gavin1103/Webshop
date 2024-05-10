import {css} from "lit";

export default css `
    .personal-info-wrapper {
        max-width: 1000px;
        height: 100%;
        background: #FFFFFF;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        margin: 5rem auto;
    }

    .block-container {
        position: relative;
        width: 750px;
        margin: 2rem auto 2rem auto;
    }

    .title {
        color: #495AFF;
    }

    .input-label {
        font-weight: bold;
        font-size: 12px;
    }

    .input-field {
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        border: 0;
        width: 100%;
        height: 50px;
        background: #F7F7FB;
        border-radius: 4px;
        margin-top: .5rem;
        font-size: 10px;
    }

    .input-row {
        margin-top: 1.5rem;
        display: flex;
        gap: 2rem;
    }

    .input-container {
        width: 100%;
    }

    .button-container {
        display: flex;
        margin-top: 2rem;
        margin-bottom: 3rem;
        justify-content: center;
        gap: 2rem;
    }

    .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 15rem;
        height: 3rem;
        border-radius: 5px;
        cursor: pointer;
        gap: 1rem;
    }

    .next-button {
        font-size: 18px;
        display: flex;
        align-items: center;
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
    
    .prev-arrow {
        max-width: 3rem;
    }
`;



