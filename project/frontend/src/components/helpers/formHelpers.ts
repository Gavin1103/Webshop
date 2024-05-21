import {html, TemplateResult} from "lit";

export function createInputField(options: {
    id: string,
    placeholder: string,
    label: string,
    type?: string,
    class?: string
}): TemplateResult {
    return html`
        <div class="input-container">
            ${options.class === "discount-field" ? "" :
                html`<label for="${options.id}" class="input-label">${options.label}</label>`
            }

            <input id="${options.id}"
                   type="${options.type || "text"}"
                   placeholder="${options.placeholder}"
                   class="input-field ${options.class}">
        </div>
    `;
}
