import {html, LitElement, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import headingStyle from "../../../styles/cms/product/headingStyle";
import {navigateTo} from "../../router";

@customElement("cms-header")
export class CmsHeader extends LitElement {
    public static styles = [headingStyle];

    @property({type: String})
    public iconUrl: string = "";

    @property({type: String})
    public title: string = "";

    @property({type: String})
    public subTitle: string = "";

    @property({type: Boolean})
    public redirectOption: boolean = false;

    @property({type: String})
    public redirectUrl: string = "";

    @property({type: String})
    public redirectText: string = "";

    private redirectToSpecificPage(): void{
        navigateTo(this.redirectUrl)
    }

    private goBack(): void {
        window.history.back();
    }

    public render(): TemplateResult {
        return html `
            <div class="redirect-links">
                <div class="back">
                    <img class="back-icon" src="/assets/image/icons/chevron-left.svg" alt="redirect-icon">
                    <span
                        @click="${this.goBack}"
                        class="back-icon">
                    Back
                    </span>
                </div>

                <div class="redirect">
                    ${this.redirectOption ?
                        html `
                            <span 
                                @click="${this.redirectToSpecificPage}"
                                class="redirect-button">${this.redirectText}
                            </span>
                            <img class="redirect-icon" src="/assets/image/icons/chevron-right.svg" alt="redirect-icon">
                            `
                        : ""}
                </div>
            </div>
            
            <div class="header">
                <img class="page-icon" src="${this.iconUrl}" alt="products-tag-icon">
                <div class="header-text">
                    <span class="title">${this.title}</span>
                    <span class="sub-title">${this.subTitle}</span>
                </div>
            </div>
        `;
    }
}