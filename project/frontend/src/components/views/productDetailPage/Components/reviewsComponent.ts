import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import globalStyle from "../styles/globalStyle";

@customElement("review-component")
export class ReviewComponent extends LitElement {
    private fontSize = "25px";

    public static styles = [
        globalStyle,
        css`
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
        `,
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
