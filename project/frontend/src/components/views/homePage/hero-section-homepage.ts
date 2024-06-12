import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import heroSectionHomePageStyle from "../../../styles/homePage/heroSectionHomePageStyle";
import {navigateTo} from "../../router";



@customElement("hero-section-homepage")
export class HeroSectionHomepage extends LitElement {
    @property({ type: String })
    public title: string = "";

    @property({type: String})
    public subTitle: string = "";

    @property({type: String})
    public redirectUrl: string | undefined;

    public static styles = [heroSectionHomePageStyle];


    private redirectToVisit(): void {
        if (this.redirectUrl) {
            navigateTo(this.redirectUrl);
        }
    }

    public render(): TemplateResult {

        return html`
            <section class="hero">
                <div class="text">
                    <h1 class="title">${this.title}</h1>
                    <h1 class="sub-title">${this.subTitle}</h1>
                </div>
                <div class="more-info-button" @click="${this.redirectToVisit}">
                    <span tabindex="1">Visit</span>
                    <img src="/assets/image/icons/arrow-right.svg" alt="visit button">
                </div>
            </section>
        `;
    }
}