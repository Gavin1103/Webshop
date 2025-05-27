import {html, LitElement} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';
import {TemplateResult} from 'lit';
import axios from 'axios';
import regionCaptureStyle from "../styles/feedbackTool/regionCaptureStyle";

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

    public static styles = [regionCaptureStyle];

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
        this.dispatchEvent(new CustomEvent('loading-start', {bubbles: true, composed: true}));
        if (this.selection) {
            const x = Math.round(Math.min(this.selection.startX, this.selection.endX));
            const y = Math.round(Math.min(this.selection.startY, this.selection.endY));
            const width = Math.round(Math.abs(this.selection.endX - this.selection.startX));
            const height = Math.round(Math.abs(this.selection.endY - this.selection.startY));

            if (width <= 0 || height <= 0) {
                this.dispatchEvent(new CustomEvent('screenshot-error', {detail: 'Invalid selection area. Please try again.'}));
                this.dispatchEvent(new CustomEvent('loading-end', {bubbles: true, composed: true}));
                return;
            }

            const clip = {x, y, width, height};

            try {
                const response = await axios.post(`${viteConfiguration.SERVER_URL}`, {
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
                    this.dispatchEvent(new CustomEvent('screenshot-error', {detail: 'Failed to capture screenshot'}));
                }
            } catch (error) {
                console.error('Error capturing screenshot:', error);
                this.dispatchEvent(new CustomEvent('screenshot-error', {detail: 'Error capturing screenshot'}));
            } finally {
                this.dispatchEvent(new CustomEvent('loading-end', {bubbles: true, composed: true}));
            }
        }
    }
}
