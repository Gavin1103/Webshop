import { css } from "lit";

export default css`
    p {
        margin: 0px;
    }

    section {
        width: 100%;
        height: auto;
    }

    .rating-section {
        display: flex;
        justify-content: space-between;
        margin: 0 0 20px 0;

        section {
            height: 150px;
        }

        .summary-section {
            width: 20%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            p {
                font-size: 30px;
            }
        }

        .details-section {
            width: 50%;
            display: flex;
            flex-direction: column;

            .detail-item {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-evenly;

                .item-text {
                    width: auto;
                    height: 100%;
                    display: flex;
                    align-items: center;
                }

                .item-bar {
                    width: 60%;
                    height: 50%;
                    background-color: green;
                    background-color: lightgrey;
                }

                .item-amount-rating {
                    width: auto;
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
            }
        }

        .write-review-section {
            width: auto;
            display: flex;
            align-items: center;
        }
    }

    @media only screen and (max-width: 1400px) {
        .rating-section {
            .summary-section {
                width: 17%;
            }
        }
    }
    @media only screen and (max-width: 955px) {
        .rating-section {
            flex-direction: column;

            section {
                height: auto;
                margin: 5px 0 5px 0;
            }

            .summary-section {
                width: 100%;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                p {
                    margin: 0 30px 0 30px;
                }
            }

            .details-section {
                width: 100%;
            }

            .write-review-section {
                width: 100%;
                justify-content: center;
            }
        }
    }

    @media only screen and (max-width: 550px) {
        .rating-section {
            .summary-section {
                flex-direction: column;
            }
        }
    }

    @media only screen and (max-width: 400px) {
        .rating-section {
            .details-section {
                .detail-item {
                    .item-bar {
                        width: 40%;
                    }
                }
            }
        }
    }
`;
