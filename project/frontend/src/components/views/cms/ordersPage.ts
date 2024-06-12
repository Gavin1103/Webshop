import {html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";
import productOverviewManagementStyle from "../../../styles/cms/product/productOverviewManagementStyle";
import {OrderService} from "../../../services/OrderService";
import {Order} from "../../../types/Order";

@customElement("cms-orders")
export class OrdersPage extends LitElement {
    public static styles = [productOverviewManagementStyle];

    private ordersList: Order[] | undefined;

    private orderService: OrderService = new OrderService();


    public async connectedCallback() {
        super.connectedCallback();
        await this.loadProducts();
        this.requestUpdate();
    }

    private async loadProducts(): Promise<void> {
        this.ordersList = await this.orderService.getAllOrder();
    }

    public async deleteOrder(orderId: number): Promise<void> {
        if (orderId) {
            await this.orderService.deleteOrder(orderId);
            await this.loadProducts();
            this.requestUpdate();
        }
    }

    protected render(): TemplateResult {
        return html`
            <cms-header
                iconUrl="./assets/image/icons/cms/orders-black.svg"
                title="Orders"
                subTitle="Manage all orders"
                !redirectoption=1
                redirectUrl="/"
                redirectText="to home"
            ></cms-header>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>New client?</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>

                ${this.ordersList ? "" : html`
                    <tr>
                        <td>0</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>
                            <button @click="${this.deleteOrder}" class="btn btn-delete">Delete</button>
                        </td>
                    </tr>
                `}


                ${this.ordersList ? this.ordersList.map(order => html`
                    <tr>
                        <td>${order.orderId}</td>
                        <td>${order.userId ? "No" : "Yes"}</td>
                        <td>${order.totalAmount}</td>
                        <td>${order.paymentDetails ? order.paymentDetails["paymentMethod"] : "Unknown"}</td>
                        <td>${order.status}</td>
                        <td>
                            <button @click="${() => this.deleteOrder(order.orderId)}" class="btn btn-delete">
                                Annuleer
                            </button>
                        </td>
                    </tr>
                `) : ""}
                </tbody>
            </table>

            <confirmation-pop-up></confirmation-pop-up>
        `;
    }
}