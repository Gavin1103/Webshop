import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("custom-image-component")
export class customImageComponent extends LitElement {

  @property({ type: String })
  private height: string = "auto";

  @property({ type: String })
  private width: string = "auto";

  @property({ type: String })
  private backgroundImageUrl: string = "";

  @property({ type: String })
  private alt: string = "image";

  public static styles = css`
    section {
        width: var(--custom-width);
        height: var(--custom-height);
        background-color: yellow;

        img {
          width: 100%;
          height: 100%; 
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); 
          object-fit: cover; 
          object-position:top right;
          max-width: 100%;
        }
    }
  `;

  public connectedCallback(): void {
    super.connectedCallback();
    this.updateStyles();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    this.updateStyles();
  }

  private updateStyles(): void {
    this.style.setProperty("--custom-height", this.height);
    this.style.setProperty("--custom-width", this.width);
  }

  public render(): TemplateResult {
    return html`
      <section>
          <img src="${this.backgroundImageUrl}" alt="${this.alt}"/>
      </section>
    `;
  }

}
