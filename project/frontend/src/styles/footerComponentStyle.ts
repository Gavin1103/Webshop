import { css } from "lit";

export default css`
    footer {
        margin: 12vh 0 0 0;
        padding: 10px 0 0 0;
        width: 100%;
        background-color: lightgrey;
        display: flex;
        flex-direction: column;
        align-items: center;

        .footer-top {
            width: 60%;
            display: flex;
            justify-content: space-between;

            section {
                ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;

                    .title {
                        font-weight: bolder;
                        font-size: 25px;
                    }

                    li {
                        font-size: 15px;
                        margin: 5px 0 5px 0;
                    }
                }
            }

            .right-section {
                img {
                    width: 200px;
                }
            }
        }
        .footer-bottom {
            height: auto;
            width: 60%;

            p {
                font-size: 20px;
                font-weight: bolder;
            }
        }
    }

    @media only screen and (max-width: 1400px) {
        footer {
            .footer-top {
                width: 80%;
            }

            .footer-bottom {
                width: 80%;
            }
        }
    }

    @media only screen and (max-width: 1100px) {
        footer {
            .footer-top {
                width: 90%;
            }

            .footer-bottom {
                width: 90%;
            }
        }
    }
`;
