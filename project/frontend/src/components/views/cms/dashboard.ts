import {css, html, LitElement, TemplateResult} from 'lit';
import {customElement} from "lit/decorators.js";

@customElement("cms-dashboard")
export class Dashboard extends LitElement {
    public static styles = css`
        :host {
            display: flex;
            min-height: 100vh;
            font-family: Arial, sans-serif;
        }

        .sidebar {
            width: 250px;
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }

        .sidebar h2 {
            text-align: center;
        }

        .sidebar ul {
            list-style: none;
            padding: 0;
        }

        .sidebar li {
            margin: 15px 0;
        }

        .sidebar a {
            color: white;
            text-decoration: none;
            font-size: 18px;
        }

        .main-content {
            flex: 1;
            padding: 20px;
            background-color: #ecf0f1;
        }

        .main-content h1 {
            margin-top: 0;
        }
    `;

    protected render(): TemplateResult {
        return html`
            <div class="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Statistics</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Reviews</a></li>
                    <li><a href="#">Users</a></li>
                    <li><a href="#">Tools</a></li>
                </ul>
            </div>
            <div class="main-content">
                <h1>Welcome to the Dashboard</h1>
                <p>This is the main content area. Add your dashboard widgets and content here.</p>
            </div>
        `;
    }
}