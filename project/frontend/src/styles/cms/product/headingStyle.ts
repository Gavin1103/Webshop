import {css} from "lit-element";

export default css`
    .redirect-links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    
    .back,
    .redirect {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: bolder;
    }
    
    .header {
        display: flex;
        flex-direction: row;
        margin-bottom: 2rem;
        margin-top: 2rem;
    }
    
    .page-icon {
        width: 50px;
        height: 50px;
        margin-right: 5px;
    }
    
    .header-text {
        display: flex;
        flex-direction: column;
    }
    
    .title {
        font-size: xx-large;
        font-weight: bolder;
    }
    
    .sub-title {
        font-weight: lighter;
    }
    
    
    .redirect-icon
    .back-icon{
        width: 20px;
        height: 20px;
    }
    
`