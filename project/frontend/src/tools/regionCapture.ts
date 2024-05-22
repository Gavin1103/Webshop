import {css, html, LitElement} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';
import {TemplateResult} from 'lit';
import axios from 'axios';

@customElement('region-capture')
export class RegionCapture extends LitElement {
    @property({type: Boolean}) private isSelecting: boolean = true;
    @property({type: Object}) private selection: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    } | undefined;
    @property({type: String}) private screenshot: string | null = null;

    static styles = css`
        :host {
            display: block;
            position: relative;
        }

        .selection-box {
            position: absolute;
            border: 2px dashed red;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
        }
    `;

    protected render(): TemplateResult {
        return html`
            ${this.isSelecting
                ? html`
                    <div
                        class="overlay"
                        @mousedown="${this.initiateSelection}"
                        @mouseup="${this.endSelection}"
                        @mousemove="${this.updateSelection}"
                    >
                        ${this.selection
                            ? html`
                                <div
                                    class="selection-box"
                                    style="top: ${Math.min(
                                        this.selection.startY,
                                        this.selection.endY
                                    ) - window.scrollY}px; left: ${Math.min(
                                        this.selection.startX,
                                        this.selection.endX
                                    ) - window.scrollX}px; width: ${Math.abs(
                                        this.selection.endX - this.selection.startX
                                    )}px; height: ${Math.abs(
                                        this.selection.endY - this.selection.startY
                                    )}px;"
                                ></div>
                            `
                            : ''}
                    </div>
                `
                : ''}
        `;
    }

    private initiateSelection(event: MouseEvent): void {
        event.preventDefault();
        this.selection = {
            startX: event.clientX + window.scrollX,
            startY: event.clientY + window.scrollY,
            endX: event.clientX + window.scrollX,
            endY: event.clientY + window.scrollY,
        };
    }

    private updateSelection(event: MouseEvent): void {
        if (this.isSelecting && this.selection) {
            this.selection = {
                ...this.selection,
                endX: event.clientX + window.scrollX,
                endY: event.clientY + window.scrollY,
            };
        }
    }

    private async endSelection(): Promise<void> {
        this.isSelecting = false;
        if (this.selection) {
            const x = Math.round(Math.min(this.selection.startX, this.selection.endX));
            const y = Math.round(Math.min(this.selection.startY, this.selection.endY));
            const width = Math.round(Math.abs(this.selection.endX - this.selection.startX));
            const height = Math.round(Math.abs(this.selection.endY - this.selection.startY));

            console.log(`Capturing region: x=${x}, y=${y}, width=${width}, height=${height}`);

            const clip = {x, y, width, height};

            console.log('Clip region:', clip);

            try {
                const response = await axios.post('http://localhost:3001/screenshot', {
                    url: window.location.href,
                    clientViewPort: {
                        width: document.documentElement.clientWidth,
                        height: document.documentElement.clientHeight,
                    },
                    clip,
                });

                if (response.status === 200) {
                    this.screenshot = response.data;
                    this.dispatchEvent(new CustomEvent('screenshot-captured', {detail: this.screenshot}));
                } else {
                    console.error('Failed to capture screenshot');
                }
            } catch (error) {
                console.error('Error capturing screenshot:', error);
            }
        }
    }


}
