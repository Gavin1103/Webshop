import {css} from "lit";

export default css `
    .stepper {
        margin: 2rem auto auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50rem;
        position: relative;
    }

    .connector-first, .connector-second {
        flex-grow: 1;
        height: 3px;
        background-color: #ABB7C2;
        position: absolute;
        top: 30%;
        transform: translateY(-50%);
        z-index: -1;
    }

    .connector-first {
        width: 42.5%;
        margin-left: 5rem;
    }

    .connector-second {
        width: 42.5%;
        margin-left: 25rem;
    }

    .step-completed {
        background-color: #495AFF;
    }

    .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 1;
    }
`;