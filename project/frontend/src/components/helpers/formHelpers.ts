import {html, TemplateResult} from "lit";

export function createInputField(options: {
    id: string,
    placeholder: string,
    label: string,
    type?: string,
    class?: string,
    required?: boolean
}): TemplateResult {
    return html`
        <div class="input-container">
            ${options.class === "discount-field" ? "" :
                html`<label for="${options.id}"
                            class="input-label">${options.label}${options.required ? "*" : ""}</label>`
            }

            <input id="${options.id}"
                   type="${options.type || "text"}"
                   placeholder="${options.placeholder}"
                   class="input-field ${options.class}"
                   required>
        </div>
    `;
}

export const checkInputsValidity = (element: HTMLElement, inputIds: string[]): boolean => {
    let allValid = true;

    for (const id of inputIds) {
        const input = element.shadowRoot?.querySelector<HTMLInputElement>(`#${id}`);

        if (input && !input.checkValidity()) {
            allValid = false;
            input.reportValidity();
            return false;
        }
    }
    return allValid;
};

export const processUserDetails = (form: HTMLFormElement | null): void => {
    if (!form) return;

    const personalDetails = form.querySelector<HTMLElement>('personal-details');
    const paymentDetails = form.querySelector<HTMLElement>('payment-details');
    const billingAddress = form.querySelector<HTMLElement>('billing-address');
    const shippingDetails = form.querySelector<HTMLElement>('shipping-details');

    const userDetails = {
        personalDetails: personalDetails?.shadowRoot?.querySelectorAll<HTMLInputElement>('input'),
        paymentDetails: paymentDetails?.shadowRoot?.querySelectorAll<HTMLInputElement>('input'),
        billingAddress: billingAddress?.shadowRoot?.querySelectorAll<HTMLInputElement>('input'),
        shippingDetails: shippingDetails?.shadowRoot?.querySelectorAll<HTMLInputElement>('input')
    };

    const userDetailsObject: Record<string, string> = {};
    for (const category in userDetails) {
        if (category === "paymentDetails") {
            userDetails[category as keyof typeof userDetails]?.forEach(input => {
                if (input.checked) {
                    userDetailsObject[input.name] = input.value;
                }
            });
        } else {
            userDetails[category as keyof typeof userDetails]?.forEach(input => {
                if (input.id === 'same-address' || input.value === '') return;
                userDetailsObject[input.id] = input.value;
            });
        }
    }

    localStorage.setItem('userDetails', JSON.stringify(userDetailsObject));
    console.log('User details processed:', userDetailsObject);
};

export const populateForm = (form: HTMLFormElement, userDetails: Record<string, string>): void => {
    const checkInputs = (element: HTMLElement, userDetails: Record<string, string>): void => {
        for (const key in userDetails) {
            if (key === 'payment-provider') {
                const radios = element.shadowRoot?.querySelectorAll<HTMLInputElement>('input[name="payment-provider"]');
                radios?.forEach(radio => {
                    if (radio.value === userDetails[key]) {
                        radio.checked = true;
                    }
                });
            }

            const input = element.shadowRoot?.querySelector<HTMLInputElement>(`#${key}`);
            if (input) {
                if (input.type === 'radio') {
                    const radioInput = element.shadowRoot?.querySelector<HTMLInputElement>(`input[name="${input.name}"][value="${userDetails[key]}"]`);
                    if (radioInput) {
                        radioInput.checked = true;
                    }
                } else {
                    input.value = userDetails[key];
                }
            }
        }
    };

    const personalDetails = form.querySelector<HTMLElement>('personal-details');
    if (personalDetails) {
        checkInputs(personalDetails, userDetails);
    }

    const paymentDetails = form.querySelector<HTMLElement>('payment-details');
    if (paymentDetails) {
        checkInputs(paymentDetails, userDetails);
    }

    const billingAddress = form.querySelector<HTMLElement>('billing-address');
    if (billingAddress) {
        checkInputs(billingAddress, userDetails);
    }

    const shippingDetails = form.querySelector<HTMLElement>('shipping-details');
    if (shippingDetails) {
        checkInputs(shippingDetails, userDetails);
    }
};
