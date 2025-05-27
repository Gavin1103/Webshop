import { css } from "lit";

export default css`
     .stars-section {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;

            .star {
                color: gold;
                font-size: var(--custom-size, "20px");
            }
        }
`;
