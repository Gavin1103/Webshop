import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "./CategoryCardHorizontal";

@customElement("navigation-bar")
export class NavigationBar extends LitElement {
    private sidebarVisible: boolean = false;


    private toggleSidebar(): void {
        this.sidebarVisible = !this.sidebarVisible;
        this.requestUpdate();
    }

    private closeSidebar(): void {
        this.sidebarVisible = false;
        this.requestUpdate();
    }

    public static styles = css`

        .navigation {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 8%;
            background: rgba(180, 180, 180, 0.1);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            z-index: 9999;
        }

        .sidebar {
            position: fixed;
            top: 8%;
            left: -40%;
            width: 40%;
            height: 100%;
            background: rgba(255, 255, 255, 0.10);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            transition: left 0.3s ease;
            z-index: 1;
            overflow-y: auto;
        }

        .top-container-close {
            position: sticky;
            top: 10px;
            z-index: 2;
            display: flex;
            justify-content: end;
        }

        .close-button {
            margin-right: 2%;
            transition: transform 0.3s ease;
        }

        .close-button:hover {
            transform: scale(1.1);
        }

        .icon {
            width: 40px;
            height: 40px;
            padding: 0 5px;
            transition: transform 0.3s ease;
        }

        .icon:hover {
            transform: scale(1.1);
        }

        .search-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 50px;
            margin: 5px 0;
            width: 30%;
            background: rgba(180, 180, 180, 0.6);
            transition: transform 0.3s ease;

            input[type="text"] {
                border: none;
                outline: none;
                background: none;
                width: 100%;
                height: 100%;
                font-size: large;
                padding: 0 20px;
            }
        }

        .search-bar:hover {
            transform: scale(1.03);
        }

        .links {
            width: 20%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        @media screen and (max-width: 600px) {
            .sidebar {
                left: -100%;
                width: 100%;
            }

            .search-bar {
                width: 50%;

                input[type="text"] {
                    width: 50%;
                }
            }

            .icon {
                width: 24px;
                height: 24px;
                padding: 0 5px;
            }
        }

    `;


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
                <div class="top-container-close">
                    <svg
                        class="close-button"
                        @click=${this.closeSidebar}
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                
                <div class="category-container">
                    <category-card-horizontal
                        categoryName="Action Game">
                    </category-card-horizontal>

                    <category-card-horizontal
                        categoryName="Action Game">
                    </category-card-horizontal>

                    <category-card-horizontal
                        categoryName="Action Game">
                    </category-card-horizontal>

                    <category-card-horizontal
                        categoryName="Action Game">
                    </category-card-horizontal>
                </div>
            </div>
            
        `;
    }
}