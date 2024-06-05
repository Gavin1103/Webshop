import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import ratingStarsComponentStyle from "../styles/components/ratingStarsComponentStyle";

@customElement("rating-stars-component")
export class RatingStarsCompent extends LitElement {

    @property({ type: String })
    private fontSize: string = "";

    public static styles = [
        ratingStarsComponentStyle
    ];

public connectedCallback(): void {
    super.connectedCallback();
    this.updateStyles();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    this.updateStyles();
  }


  private updateStyles(): void {
    this.style.setProperty("--custom-size", this.fontSize);
  }

    public render(): TemplateResult {
        return html`
            <section class="stars-section">
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9734;</span>
            </section>
        `;
    }
}
