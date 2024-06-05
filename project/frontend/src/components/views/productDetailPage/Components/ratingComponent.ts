import { LitElement, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import globalStyle from "../styles/globalStyle";
import ratingComponentStyle from "../styles/components/ratingComponentStyle";

@customElement("rating-component")
export class RatingComponent extends LitElement {
    public static styles = [
        globalStyle,
        ratingComponentStyle
    ];

    public render(): TemplateResult {
        return html`
            <section class="rating-section">
                <section class="summary-section">
                    <p>4.5</p>
                    <rating-stars-component fontSize="30px"> </rating-stars-component>
                    <p>31 reviews</p>
                </section>

                <section class="details-section">
                    <section class="detail-item">
                        <section class="item-text">
                            <p>1 Star</p>
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
                            <p>3 Star</p>
                        </section>
                        <section class="item-bar"></section>
                        <section class="item-amount-rating">
                            <p>22 reviews</p>
                        </section>
                    </section>

                    <section class="detail-item">
                        <section class="item-text">
                            <p>4 Star</p>
                        </section>
                        <section class="item-bar"></section>
                        <section class="item-amount-rating">
                            <p>22 reviews</p>
                        </section>
                    </section>

                    <section class="detail-item">
                        <section class="item-text">
                            <p>5 Star</p>
                        </section>
                        <section class="item-bar"></section>
                        <section class="item-amount-rating">
                            <p>22 reviews</p>
                        </section>
                    </section>
                </section>

                <section class="write-review-section">
                    <custom-button-component text="write review"></custom-button-component>
                </section>
            </section>
        `;
    }
}
