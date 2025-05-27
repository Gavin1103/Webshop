import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import customImageComponentStyle from "../../styles/components/images/customImageComponentStyle";

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


  @property({ type: String })
  private borderRadius: string = "";

  public static styles = [
    customImageComponentStyle
  ]

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
    this.style.setProperty("--custom-radius", this.borderRadius);
  }

  public render(): TemplateResult {
    return html`
      <section>
          <img src="${this.backgroundImageUrl}" alt="${this.alt}"/>
      </section>
    `;
  }

}
