import {css} from "lit";

export default css `
    :host {
        display: block;
        position: relative;
    }

    .selection-box {
        position: absolute;
        border: 2px dashed red;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        cursor: url("assets/image/icons/plus-icon.svg") 24 24, auto;
    }
`;