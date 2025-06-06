import { LitElement, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import globalStyle from "../styles/globalStyle";
import reviewsComponentStyle from "../styles/components/reviewsComponentStyle";

@customElement("review-component")
export class ReviewComponent extends LitElement {
    private fontSize = "25px";

    public static styles = [
        globalStyle,
        reviewsComponentStyle
    ];

    public render(): TemplateResult {
        return html`
            <section>
                <section class="review-section">
                    <section class="profile-section">
                        <section class="profile-image">
                            <custom-image-component
                                alt="Profile picture"
                                backgroundImageUrl="https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-CODHQ-TOUT.jpg"
                                width="100%"
                                height="100%"
                                borderRadius="50%"
                                ;
                            >
                            </custom-image-component>
                        </section>
                        <p><strong>User</strong></p>
                    </section>

                    <section class="review-detail">
                        <p>Nice product!</p>
                        <rating-stars-component fontSize="${this.fontSize}"></rating-stars-component>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries.
                        </p>
                    </section>
                </section>
                <section class="review-section">
                    <section class="profile-section">
                        <section class="profile-image">
                            <custom-image-component
                                alt="Profile picture"
                                backgroundImageUrl="https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-CODHQ-TOUT.jpg"
                                width="100%"
                                height="100%"
                                borderRadius="50%"
                                ;
                            >
                            </custom-image-component>
                        </section>
                        <p><strong>User</strong></p>
                    </section>

                    <section class="review-detail">
                        <p>Nice product!</p>
                        <rating-stars-component fontSize="${this.fontSize}"></rating-stars-component>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries.
                            <br /><br />
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries.
                            <br /><br />
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries.
                            <br /><br />
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries.
                        </p>
                    </section>
                </section>
            </section>
        `;
    }
}
