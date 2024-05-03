import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";



@customElement("navigation-bar")
export class NavigationBar extends LitElement {
    private sidebarVisible: boolean = false;

    public static styles = css`

        .navigation {
            background: #D9D9D9;
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: -500px;
            width: 500px;
            height: 100%;
            background: rgba(255, 255, 255, 0.10);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            transition: left 0.3s ease;
            z-index: 1;
        }

        .icon {
            width: 40px;
            height: 40px;
        }

        .search-bar {
            display: flex;
            align-items: center;
            justify-content: space-around;
            border: 2px solid #ccc;
            border-radius: 50px;
            margin: 5px 0;
            width: 300px;
            background: #FFFFFF;

            input[type="text"] {
                border: none;
                outline: none;
            }
        }

        .links {
            width: 200px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

    `;

    private toggleSidebar(): void {
        this.sidebarVisible = true;
        this.requestUpdate();
    }

    private closeSidebar(): void {
        this.sidebarVisible = false;
        this.requestUpdate();
    }



    public render(): TemplateResult {
        return html`
            <nav class="navigation">
                <svg class="icon menu-icon"
                     @click=${this.toggleSidebar}
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                
                <div class="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                    />
                    <svg 
                        class="icon search-icon"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                
                <div class="links">
                    <svg
                        class="icon user-icon"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    
                    
                    <svg 
                        class="icon cart-icon" 
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
                    </svg>
                </div>
            </nav>

            
            <div class="sidebar" style=${this.sidebarVisible ? "left: 0;" : ""}>
                <button @click=${this.closeSidebar}>close</button>
            </div>
    `;
    }
}