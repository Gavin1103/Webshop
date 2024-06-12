import { css } from "lit";

export default css`
    main {
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;

                section {
                    min-width: 300px;
                    width: 60%;
                    margin: 5px 0;

                    h2 {
                        font-weight: bolder;
                    }
                }
            }

            .button-section {
                border-bottom: solid 5px lightgrey;
                padding: 10px 0 20px 0;

                display: flex;
                justify-content: space-between;

                p {
                    margin: 0 10px 0 0;
                    font-size: 2em;
                }

                section {
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                }

                section:last-child {
                    custom-button-component:last-child {
                        margin: 0 0 0 10px;
                    }
                }
            }

            @media only screen and (max-width: 1400px) {
                main {
                    section {
                        width: 80%;
                    }
                }
            }

            @media only screen and (max-width: 1100px) {
                main {
                    section {
                        width: 90%;
                    }
                }
            }

            @media only screen and (max-width: 750px) {
                main {
                    .button-section {
                        flex-direction: column;

                        section {
                            justify-content: flex-start;
                        }
                    }
                }
            }

            @media only screen and (max-width: 450px) {
                main {
                    .button-section {
                        flex-direction: column;

                        section {
                            align-items: center;
                            flex-direction: column;

                            p {
                                margin: 0 0 10px 0;
                            }
                        }

                        section:last-child {
                            custom-button-component:last-child {
                                margin: 10px 0 0 0;
                            }
                        }
                    }
                }
            }
`;
