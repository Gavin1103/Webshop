import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("custom-image")
export class CustomImage extends LitElement {

  @property({ type: String })
  private height: string = "auto";

  @property({ type: String })
  private width: string = "auto";

  @property({ type: String })
  private backgroundImageUrl: string = "";

  @property({ type: String })
  private alt: string = "image";

  public static styles = css`
    :host {
      display: block; 
    }
    img {
      height: var(--custom-height); 
      width: var(--custom-width);
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
    return html`<img src="${this.backgroundImageUrl}" alt="${this.alt}"/>`;
  }
}
