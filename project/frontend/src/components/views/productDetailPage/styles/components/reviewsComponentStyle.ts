import { css } from "lit";

export default css`
    section {
        width: 100%;

        .review-section {
            min-height: 150px;
            width: 100%;
            display: flex;
            border-top: solid 5px lightgrey;
            padding: 10px 0 10px 0;

            .profile-section {
                width: 20%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding: 1em 0 0 0;

                .profile-image {
                    width: 100px;
                    height: 100px;
                }

                p {
                    margin: 10px 0 0 0;
                }
            }

            .review-detail {
                height: 100%;
                width: 80%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
    }

    @media only screen and (max-width: 900px) {
        section {
            .review-section {
                flex-direction: column;

                .profile-section {
                    width: auto;
                    align-items: center;
                    flex-direction: column;
                }

                .review-detail {
                    width: 100%;
                }
            }
        }
    }
`;
