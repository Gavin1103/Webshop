import {css} from "lit";

export default css `
    .sidebar {
        width: 200px;
        height: 100vh;
        background-color: #777FE5;
        color: white;
        padding: 20px;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .sidebar h2 {
        text-align: center;
    }

    .sidebar-container {
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .sidebar-element {
        display: flex;
        justify-content: space-between;
        margin: 10px 0 2rem;
        padding: 0 .5rem;
        cursor: pointer;
    }
    
    .sidebar-element:hover {
        transform: scale(1.01);
    }

    .sidebar-element span {
        color: white;
        text-decoration: none;
        font-size: 20px;
    }

    .search-bar {
        display: flex;
        flex-direction: column;
    }

    .search-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        margin: 5px 0;
        backdrop-filter: blur(10px);
        transition: transform 0.3s ease;
        background-color: #ecf0f1;
        height: 40px;

        input[type="text"] {
            border: none;
            outline: none;
            background: none;
            width: 100%;
            height: 100%;
            font-size: small;
            padding: 0 10px;
        }
    }
    
    .sidebar-group {
        margin-bottom: 2rem;
        margin-top: auto;
    }

    .search-input:hover {
        transform: scale(1.01);
    }

    .icon {
        width: 25px;
        height: 25px;
        padding: 0 5px;
        transition: transform 0.3s ease;
        cursor: pointer;
        margin-left: 5px;
    }

    .icon:hover {
        transform: scale(1.1);
    }
`;