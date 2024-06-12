import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("footer-component")
export class Footer extends LitElement {
    public static styles = css`
        footer {
            margin: 50px 0 0 0;
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
                            font-size: 30px;
                        }

                        li {
                            font-size: 15px;
                            margin: 5px 0 5px 0;
                        }
                    }
                }

                .right-section {
                    img {
                        width:200px;
                    }
                }
            }
            .footer-bottom {
                height: auto;
                width: 60%;

                p{
                    font-size:20px;
                    font-weight:bolder;
                }
            }
        }
    `;

    public render(): TemplateResult {
        return html`
            <footer>
                <section class="footer-top">
                    <section class="left-section">
                        <ul>
                            <li class="title">About the store</li>
                            <li>Home</li>
                            <li>About us</li>
                            <li>FAQ</li>
                            <li>Policy</li>
                        </ul>
                    </section>
                    <section class="mid-section">
                        <ul>
                            <li class="title">Customer service</li>
                            <li>Contact us</li>
                            <li>View orders</li>
                            <li>Aaron is een PISPAAL</li>
                        </ul>
                    </section>
                    <section class="right-section">
                        <img
                            src="https://lucastars.hbo-ict.cloud/media/84c86ce53485454382fb2287e387fa9e/00000006000000000000000000000000.png"
                        />
                    </section>
                </section>
                <section class="footer-bottom">
                    <p>&#169;2024 LucaStar All Right Reserved</p>
                </section>
            </footer>
        `;
    }
}
