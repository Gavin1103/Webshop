import { LitElement, TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import footerComponentStyle from "../styles/footerComponentStyle";

@customElement("footer-component")
export class Footer extends LitElement {
    public static styles = [footerComponentStyle];

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
