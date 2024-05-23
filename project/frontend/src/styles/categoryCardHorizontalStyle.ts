import {css} from "lit";

export default css `
    .category-card {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.75);
        margin: 0 10% 10% 10%;
        border-radius: 10px;
        box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        img {
            width: 50%;
            object-fit: cover;
            height: 30vh;
            margin-right: 20px;
            border-radius: 10px 0 0 10px;
        }
    }

    .category-card:hover {
        transform: scale(1.05);
        box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.2);
    }
`;