import {html, LitElement, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import homePageStyle from "../../../styles/homePageStyle";


@customElement("home-page")
export class HomePage extends LitElement {
    public static styles = [homePageStyle];
    public topDealProducts = [
        {
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/6bAF2VVEamgKclalI0oBnoAe.jpg",
            name: "cyberpunk",
            price: 45.99
        },
        {
            image: "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-CODHQ-TOUT.jpg",
            name: "Call Of Duty",
            price: 79.99
        },
        {
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/6bAF2VVEamgKclalI0oBnoAe.jpg",
            name: "cyberpunk",
            price: 45.99
        },
        {
            image: "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-CODHQ-TOUT.jpg",
            name: "Call Of Duty",
            price: 79.99
        },
        {
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/6bAF2VVEamgKclalI0oBnoAe.jpg",
            name: "cyberpunk",
            price: 45.99
        },
        {
            image: "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-CODHQ-TOUT.jpg",
            name: "Call Of Duty",
            price: 79.99
        },
    ];
    public recommendProducts = [
        {
            image: "https://m.media-amazon.com/images/M/MV5BMjZkYTY2YzQtMGVhNC00OTZmLTk1MmYtZjJlNGJlMzY3MDFmXkEyXkFqcGdeQXVyMTA1OTAyOTI@._V1_FMjpg_UX1000_.jpg",
            name: "Quantum Break",
            price: 19.99
        },
        {
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202209/1918/MP0I6Folca9wOgs9A39wwvj1.png",
            name: "Dead Space",
            price: 15.99
        },
        {
            image: "https://notadogame.com/uploads/game/cover/250x/64097ac213f31.jpg",
            name: "Yakuza Ishin",
            price: 24.99
        },
        {
            image: "https://m.media-amazon.com/images/M/MV5BMjZkYTY2YzQtMGVhNC00OTZmLTk1MmYtZjJlNGJlMzY3MDFmXkEyXkFqcGdeQXVyMTA1OTAyOTI@._V1_FMjpg_UX1000_.jpg",
            name: "Quantum Break",
            price: 19.99
        },
        {
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202209/1918/MP0I6Folca9wOgs9A39wwvj1.png",
            name: "Dead Space",
            price: 15.99
        },
        {
            image: "https://notadogame.com/uploads/game/cover/250x/64097ac213f31.jpg",
            name: "Yakuza Ishin",
            price: 24.99
        },

    ];
    public categoryList = [
        {
            image: "https://assets.xboxservices.com/assets/48/de/48de604b-99ee-4400-a600-6958a71f0959.jpg?n=Microsoft-Store-2018_Priority-Feature-0_Pay_1040x585.jpg",
            name: "XBox"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/PlayStation_App_Icon.jpg/800px-PlayStation_App_Icon.jpg",
            name: "Play Station"
        },
        {
            image: "https://static-cdn.jtvnw.net/jtv_user_pictures/4074674c-ad77-412d-aafe-6d276b3cacda-profile_image-300x300.png",
            name: "Nintendo"
        },
        {
            image: "https://assets.xboxservices.com/assets/48/de/48de604b-99ee-4400-a600-6958a71f0959.jpg?n=Microsoft-Store-2018_Priority-Feature-0_Pay_1040x585.jpg",
            name: "XBox"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/PlayStation_App_Icon.jpg/800px-PlayStation_App_Icon.jpg",
            name: "Play Station"
        },
        {
            image: "https://static-cdn.jtvnw.net/jtv_user_pictures/4074674c-ad77-412d-aafe-6d276b3cacda-profile_image-300x300.png",
            name: "Nintendo"
        }
    ];

    public render(): TemplateResult {

        return html`
            <hero-section-homepage
                title="New Product Promotion"
                subTitle="Up To 70% Off">
            </hero-section-homepage>
            
            <product-carousel-section
                title="Top Deal"
                .productsData = "${this.topDealProducts}">
            </product-carousel-section>

            <product-carousel-section
                title="Recommended For You"
                .productsData = "${this.recommendProducts}">
            </product-carousel-section>
            
            <category-grid-section
                .categoryList = "${this.categoryList}"
            >
            </category-grid-section>
            
            
        `;
    }
}