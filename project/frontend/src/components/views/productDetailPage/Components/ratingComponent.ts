import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import globalStyle from "../styles/globalStyle";

@customElement("rating-component")
export class RatingComponent extends LitElement {
    public static styles = [
        globalStyle,
        css`
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

                section {
                    height: 150px;
                }

                .summary-section {
                    width: 25%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    p {
                        font-size: 30px;
                    }

                    .stars-section {
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;

                        .star {
                            color: gold;
                            font-size: clamp(0.5em, 3em, 4em); 
                        }
                    }

                    i {
                        height: 100%;
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

                .write-review-container {
                    width: auto;
                    display: flex;
                    align-items:center;
                }
            }
        `,
    ];

    public render(): TemplateResult {
        return html`
            <section class="rating-section">
                <section class="summary-section">
                    <p>4.5</p>
                    <section class="stars-section">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9734;</span>
                    </section>
                    <p>31 reviews</p>
                </section>

                <section class="details-section">
                    <section class="detail-item">
                        <section class="item-text">
                            <p>2 Star</p>
                        </section>
                        <section class="item-bar"></section>
                        <section class="item-amount-rating">
                            <p>22 reviews</p>
                        </section>
                    </section>

                    <section class="detail-item">
                        <section class="item-text">
                            <p>2 Star</p>
                        </section>
                        <section class="item-bar"></section>
                        <section class="item-amount-rating">
                            <p>22 reviews</p>
                        </section>
                    </section>

                    <section class="detail-item">
                        <section class="item-text">
                            <p>2 Star</p>
                        </section>
                        <section class="item-bar"></section>
                        <section class="item-amount-rating">
                            <p>22 reviews</p>
                        </section>
                    </section>

                    <section class="detail-item">
                        <section class="item-text">
                            <p>2 Star</p>
                        </section>
                        <section class="item-bar"></section>
                        <section class="item-amount-rating">
                            <p>22 reviews</p>
                        </section>
                    </section>

                    <section class="detail-item">
                        <section class="item-text">
                            <p>2 Star</p>
                        </section>
                        <section class="item-bar"></section>
                        <section class="item-amount-rating">
                            <p>22 reviews</p>
                        </section>
                    </section>
                </section>

                <section class="write-review-container">
                    <custom-button-component text="write review"></custom-button-component>
                </section>
            </section>
        `;
    }
}
