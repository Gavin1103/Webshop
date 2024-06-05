import { css } from "lit";

export default css`
    section {
        width: var(--custom-width);
        height: var(--custom-height);

        img {
            width: 100%;
            height: 100%;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            object-fit: contain;
            object-position: center;
            border-radius: var(--custom-radius);
        }
    }
`;
